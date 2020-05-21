import { Module } from '@nestjs/common';

import { MulterModule } from '@nestjs/platform-express';
import { ImageRepository } from '../repository/image.repository';
import { CourseInfoController } from '../app/courseinfo/course-info.controller';
import { CourseInfo } from '../model/courseinfo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCodes } from '../model/coursecode.entity';
import { InstructorEntity } from '../model/instructor.entity';
import { CourseCodeController } from '../app/coursecode/course-code.controller';
import { CourseInfoService } from '../app/courseinfo/course-info.service';
import { CourseCodeService } from '../app/coursecode/course-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInfo, CourseCodes, InstructorEntity]),MulterModule],
  controllers: [CourseInfoController, CourseCodeController],
  providers: [CourseInfoService, CourseCodeService,ImageRepository],
})
export class CourseModule {}
