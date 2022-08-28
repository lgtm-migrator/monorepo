import {
  Args,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Inject, Logger } from '@nestjs/common';
import { ESDB } from '../app/utils/constants';
import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { DgService, Disc, DiscStatus } from './dg.service';
import { EventNames } from './types/disc-added';
import { DiscLost } from './types/disc-lost';

// @ObjectType({ description: 'Blog post testies' })
// export class BlogPost {
//   @Field((type) => ID)
//   id: string;
//
//   @Field()
//   title: string;
//
//   @Field()
//   body: string;
// }

@InputType()
export class DiscLostInput {
  @Field(() => ID)
  discId: string;
}

@InputType()
export class DiscsInput {
  @Field(() => [DiscStatus], { nullable: true })
  statuses?: DiscStatus[];
}

@Resolver((of) => Disc)
export class DgResolver {
  private readonly logger = new Logger(DgResolver.name);

  constructor(
    @Inject(ESDB)
    private client: EventStoreDBClient,
    @Inject(DgService)
    private service: DgService,
  ) {}

  @Query((returns) => [Disc])
  async discs(
    @Args('input', { nullable: true }) input?: DiscsInput,
  ): Promise<Disc[]> {
    const discs = await this.service.getDiscs();
    if (input?.statuses?.length) {
      return discs.filter((disc) => input.statuses.includes(disc.status));
    }
    return discs;
  }

  @Mutation((returns) => Disc, { nullable: true })
  async discLost(@Args('input') input: DiscLostInput): Promise<Disc> {
    const { discId } = input;

    const discsFirst = await this.service.getDiscs();
    if (!discsFirst.find((x) => x.id === discId)) {
      this.logger.warn(`Disc not found for id: ${discId}, not doing anything`);
      return null;
    }

    const event = jsonEvent<DiscLost>({
      type: EventNames.DiscLost,
      data: {
        discId,
        date: new Date(),
      },
    });
    await this.client.appendToStream('testies', event);

    const discs = await this.service.getDiscs();
    return discs.find((x) => x.id === discId);
  }
}