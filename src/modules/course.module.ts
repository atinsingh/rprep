import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';
import { ImageRepository } from '../repository/image.repository';
import { CourseInfoController } from './courseinfo/course-info.controller';
import { CourseInfo } from '../model/courseinfo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCodes } from '../model/coursecode.entity';
import { InstructorEntity } from '../model/instructor.entity';
import { CourseCodeController } from './courseinfo/course-code.controller';
import { CourseInfoService } from './courseinfo/course-info.service';
import { CourseCodeService } from './courseinfo/course-code.service';
import { InstructorModule } from "./instructor/instructor.module";
import {CourseDetailsModule} from "./coursemodules/course.details.module";

@Module({
  imports: [TypeOrmModule.forFeature([CourseInfo, CourseCodes, InstructorEntity]),MulterModule , InstructorModule],
  controllers: [CourseInfoController, CourseCodeController],
  providers: [CourseInfoService, CourseCodeService,ImageRepository],
  exports: [CourseInfoService]
})
export class CourseModule {}
