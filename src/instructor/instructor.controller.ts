import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorEntity } from '../model/instructor.entity';

@Controller('api/instructor')
export class InstructorController {
  constructor(private instructorService: InstructorService){}

  @Post()
  async createInstructor(@Body() instructor): Promise<InstructorEntity | any> {
    Logger.log('Got request with body')
    Logger.log(instructor);
    return await this.instructorService.createOne(instructor);
  }

  @Get()
  async getAllInstructors() : Promise<InstructorEntity [] | any> {
    return this.instructorService.getAllInstructors();
  }
}
