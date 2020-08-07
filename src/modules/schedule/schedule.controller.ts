import { Body, Controller, Get, Logger, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { BadDataException } from '../../exceptions/bad.data.exception';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/schedule')
@ApiTags('Schedule')
@UseInterceptors(LoggingInterceptor)
export class ScheduleController {

  constructor(private scheduleService : ScheduleService) {
  }

  @Post("/")
  @ApiBody({
    type: ScheduleEntity
  })
  async createSchedule(@Body() schedule: ScheduleEntity) {
    return await this.scheduleService.saveSchedule(schedule);
  }

  @Get("/:courseid")
  @ApiResponse({
    status: 200,
    type : ScheduleEntity,
    description: 'Return the batch schedule for particular course id'
  })
  @ApiResponse({
    status: 400,
    type : BadDataException,
    description: 'Schedule not found'
  })
  @ApiParam({
    name: 'courseid',
    type: 'string',
    description: 'CourseId of a course'
  })
  async getScheduleId(@Param('courseid') courseId: string) {
    Logger.log(`Request received for the courseId ${courseId}`)
    return await this.scheduleService.getScheduleByCourseId(courseId);
  }
}
