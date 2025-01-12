import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { format } from 'date-fns';
import { Logger } from '@nestjs/common';
import { DgService } from '../../dg/dg.service';
import { GetGeneralEvents } from './get-general-events';
import { EventName } from '../schema';

export class GetHomeModelQuery {}
export interface FeedItem {
  date: string;
  name: string;
  type: string;
}

@QueryHandler(GetHomeModelQuery)
export class GetHomeModelHandler implements IQueryHandler<GetHomeModelQuery> {
  private readonly logger = new Logger(GetHomeModelHandler.name);

  constructor(
    private dgService: DgService,
    private generalEvents: GetGeneralEvents,
  ) {}

  async execute(query: GetHomeModelQuery): Promise<any> {
    let events: FeedItem[] = [];

    const generalEvents = await this.generalEvents.get();
    generalEvents.forEach((x) => {
      events.push({ date: x.date, name: x.name, type: 'Adventure' });
    });

    // const events = await this.getAllGeneralEvents();
    const discs = await this.dgService.getDiscs();
    discs.forEach((x) => {
      if (!x.date) {
        this.logger.log(
          `Ignoring disc ${x.brand}/${x.model} because there is no date associated`,
        );
        return;
      }
      events.push({
        date: format(new Date(x.date), 'yyyy-LL-dd'),
        name: `#${x.number} ${x.brand}/${x.model}`,
        type: 'Disc Added',
      });
    });
    this.logger.log(`Home got ${events.length} events`);

    events = events.sort((x, y) => y.date.localeCompare(x.date));

    return { events };
  }
}
