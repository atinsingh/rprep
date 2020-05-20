import { Module } from '@nestjs/common';
import { CourseInfoController } from '../controllers/course-info.controller';
import { CourseInfoService } from '../services/course-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInfo } from '../domain/courseinfo.entity';
import { CourseCodes } from '../domain/coursecode.entity';
import { CourseCodeService } from '../services/course.code.service';
import { CourseCodeController } from '../controllers/course.code.controller';
import { InstructorEntity } from '../domain/instructor.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImageRepository } from '../repository/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInfo, CourseCodes, InstructorEntity]),MulterModule],
  controllers: [CourseInfoController, CourseCodeController],
  providers: [CourseInfoService, CourseCodeService,ImageRepository],
})
export class CourseModule {}
