import { Module } from '@nestjs/common';
import { ClimbController } from './climb.controller';
import { eventStoreFactory } from '../app/utils/event-store';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [ClimbController],
  providers: [eventStoreFactory],
})
export class ClimbModule {}
