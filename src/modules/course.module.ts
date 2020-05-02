import { Module } from '@nestjs/common';
import { CourseInfoController } from '../controllers/course-info.controller';
import { CourseInfoService } from '../services/course-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInfo } from '../domain/courseinfo.entity';
import { CourseCodes } from '../domain/coursecode.entity';
import { CourseCodeService } from '../services/course.code.service';
import { CourseCodeController } from '../controllers/course.code.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInfo, CourseCodes])],
  controllers: [CourseInfoController, CourseCodeController],
  providers: [CourseInfoService, CourseCodeService],
})
export class CourseModule {}
