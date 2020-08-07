import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';
import { CourseModule } from '../course.module';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity]),
    CourseModule
  ],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {

}
