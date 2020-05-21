import { Module } from '@nestjs/common';
import { CourseInfoController } from './course-info.controller';
import { CourseInfoService } from './course-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInfo } from '../../model/courseinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInfo])],
  controllers: [CourseInfoController],
  providers: [CourseInfoService],
})
export class CourseModule {}
