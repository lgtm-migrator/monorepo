import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Render,
  Response,
} from '@nestjs/common';
import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONEventType,
  START,
} from '@eventstore/db-client';
import { nanoid } from 'nanoid';
import { ESDB } from '../constants';
import { IsNotEmpty } from 'class-validator';

export enum EventNames {
  ClimbSessionCreated = 'climb-session-created',
  RouteCanceled = 'route-canceled',
  RouteCompleted = 'route-completed',
}

export type ClimbSessionCreated = JSONEventType<
  EventNames.ClimbSessionCreated,
  {
    id: string;
    date: Date;
  }
>;

export type RouteCanceled = JSONEventType<
  EventNames.RouteCanceled,
  {
    grade: string;
    date: Date;
  }
>;

export type RouteCompleted = JSONEventType<
  EventNames.RouteCompleted,
  {
    grade: string;
    date: Date;
  }
>;

export type ClimbSessionEvents =
  | ClimbSessionCreated
  | RouteCanceled
  | RouteCompleted;

// todo: enum
class RouteInputDto {
  @IsNotEmpty()
  grade: string;
  @IsNotEmpty()
  sessionId: string;
}

@Controller('climb')
export class ClimbController {
  constructor(
    @Inject(ESDB)
    private client: EventStoreDBClient,
  ) {}
  @Get()
  @Render('climb/index')
  async index() {
    let events;
    try {
      events = this.client.readStream<ClimbSessionCreated>('climbs');
    } catch {
      return { climbs: [] };
    }

    const climbs = [];
    for await (const { event } of events) {
      switch (event.type) {
        case EventNames.ClimbSessionCreated:
          climbs.unshift(event.data);
          break;
      }
    }
    console.log('climbs', climbs);
    return {
      climbs,
    };
  }

  @Post(EventNames.ClimbSessionCreated)
  public async climbSessionCreated(@Response() res) {
    const event = jsonEvent<ClimbSessionCreated>({
      type: EventNames.ClimbSessionCreated,
      data: {
        id: nanoid(),
        date: new Date(),
      },
    });
    await this.client.appendToStream('climbs', event);
    await this.client.appendToStream(`climb-session-${event.data.id}`, event);
    return res.redirect(`session/${event.data.id}`);
  }

  @Get('session/:id')
  @Render('climb/session')
  public async viewClimbSession(@Param('id') sessionId: string) {
    console.log('sessionid', sessionId);
    const GRADES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const model = GRADES.map((number) => ({
      grade: `V${number}`,
      count: 0,
    }));

    const events = this.client.readStream<ClimbSessionEvents>(
      `climb-session-${sessionId}`,
    );
    for await (const { event } of events) {
      switch (event.type) {
        case EventNames.ClimbSessionCreated:
          break;
        case EventNames.RouteCanceled: {
          const grade = model.find((x) => x.grade === event.data.grade);
          grade.count--;
          break;
        }

        case EventNames.RouteCompleted: {
          const grade = model.find((x) => x.grade === event.data.grade);
          grade.count++;
          break;
        }
      }
    }
    console.log('model', model);

    return {
      sessionId,
      model,
      canceledUrl: `/climb/${EventNames.RouteCanceled}`,
      completedUrl: `/climb/${EventNames.RouteCompleted}`,
    };
  }

  @Post(EventNames.RouteCanceled)
  public async routeCanceled(@Body() body: RouteInputDto, @Response() res) {
    const { grade, sessionId } = body;
    const event = jsonEvent<RouteCanceled>({
      type: EventNames.RouteCanceled,
      data: {
        grade,
        date: new Date(),
      },
    });
    await this.client.appendToStream(`climb-session-${sessionId}`, event);
    return res.redirect(`session/${sessionId}`);
  }

  @Post(EventNames.RouteCompleted)
  public async routeCompleted(@Body() body: RouteInputDto, @Response() res) {
    const { grade, sessionId } = body;
    const event = jsonEvent<RouteCompleted>({
      type: EventNames.RouteCompleted,
      data: {
        grade,
        date: new Date(),
      },
    });
    await this.client.appendToStream(`climb-session-${sessionId}`, event);
    return res.redirect(`session/${sessionId}`);
  }
}
