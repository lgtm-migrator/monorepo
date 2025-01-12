import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Render,
  Response,
  UseGuards,
} from '@nestjs/common';
import { EventStoreDBClient, jsonEvent } from '@eventstore/db-client';
import { nanoid } from 'nanoid';
import { ESDB } from '../app/utils/constants';
import {
  DiscAdded,
  DiscRemoved,
  DiscsReset,
  EventNames,
} from './types/disc-added';
import { DgService } from './dg.service';
import { IsNotEmpty } from 'class-validator';
import { GuardMe } from '../auth/guard-me.guard';
import { ApiOperation } from '@nestjs/swagger';

const csv = require('csvtojson');

const CONTROLLER_NAME = 'dg';

function prefixController(route: string) {
  return `/${CONTROLLER_NAME}/${route}`;
}

export class DiscRemovedDto {
  @IsNotEmpty()
  id: string;
}

export class BulkUploadDto {
  @IsNotEmpty()
  data: string;
}

interface BulkUploadItem {
  Id: string;
  Brand: string;
  Model: string;
  'Date Retrieved': string;
}

@Controller(CONTROLLER_NAME)
@UseGuards(GuardMe)
export class DgController {
  private readonly logger = new Logger(DgController.name);
  constructor(
    @Inject(ESDB)
    private client: EventStoreDBClient,
    @Inject(DgService)
    private service: DgService,
  ) {}

  @Get()
  @Render('dg/index')
  async index() {
    return {};
  }

  @Get('discs')
  @Render('dg/discs')
  async discs() {
    const discs = await this.service.getDiscs();
    return {
      discs: discs.map((d) => ({
        event: d,
        discNumber: d.number,
      })),
      postUrl: prefixController(EventNames.DiscAdded),
      resetUrl: prefixController(EventNames.DiscsReset),
      uploadUrl: prefixController('bulk-upload'),
    };
  }

  @Get('courses')
  @Render('dg/courses')
  async courses() {
    const courses = await this.service.getPlayedCourses();
    const manuallyPlayedCourses = await this.service.getManualPlayedCourses();
    const excludedCourses = await this.service.excludedCourses();
    return {
      totalCoursesPlayed: manuallyPlayedCourses.length + courses.length,
      courses,
      manuallyPlayedCourses,
      excludedCourses,
      deleteUrl: prefixController(EventNames.DiscRemoved),
    };
  }

  @Get('recommender')
  @Render('dg/recommender')
  async recommender() {
    const allCourses = await this.service.getAllCourses();
    return {};
  }

  @Post(EventNames.DiscAdded)
  public async discAdded(@Response() res, @Body() body) {
    const event = jsonEvent<DiscAdded>({
      type: EventNames.DiscAdded,
      data: {
        id: nanoid(),
        date: body.date || new Date(),
        brand: body.brand,
        model: body.model,
      },
    });
    await this.client.appendToStream('testies', event);
    return res.redirect(`/${CONTROLLER_NAME}`);
  }

  @Post(EventNames.DiscRemoved)
  public async discRemoved(@Response() res, @Body() body: DiscRemovedDto) {
    const { id } = body;
    const event = jsonEvent<DiscRemoved>({
      type: EventNames.DiscRemoved,
      data: {
        id,
        date: new Date(),
      },
    });
    await this.client.appendToStream('testies', event);
    return res.redirect(`/${CONTROLLER_NAME}`);
  }

  @Post(EventNames.DiscsReset)
  public async discsReset(@Response() res) {
    const event = jsonEvent<DiscsReset>({
      type: EventNames.DiscsReset,
      data: {},
    });
    await this.client.appendToStream('testies', event);
    return res.redirect(`/${CONTROLLER_NAME}`);
  }

  @ApiOperation({ summary: 'Creates many discs from a CSV' })
  @Post('bulk-upload')
  public async bulkUpload(@Body() body: BulkUploadDto, @Response() res) {
    const { data } = body;

    this.logger.log(`Parsing csv upload`);
    const entries: BulkUploadItem[] = await csv().fromString(data);
    this.logger.log(`Parsed, uploading to db`);

    const events = entries.map(({ Model, Brand, ...rest }) =>
      jsonEvent<DiscAdded>({
        type: EventNames.DiscAdded,
        data: {
          id: nanoid(),
          date: rest['Date Retrieved']
            ? new Date(rest['Date Retrieved'])
            : null,
          brand: Brand,
          model: Model,
        },
      }),
    );

    await this.client.appendToStream('testies', events);
    this.logger.log(`Sent to db`);
    return res.redirect(`/${CONTROLLER_NAME}`);
  }

  @Get('api/courses')
  public async allCourses() {
    return this.service.getAllCourses();
  }
}
