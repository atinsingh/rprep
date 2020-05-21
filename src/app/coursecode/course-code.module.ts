import { Module } from '@nestjs/common';
import { CourseCodeController } from './course-code.controller';
import { CourseCodeService } from './course-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCodes } from '../../model/coursecode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseCodes])],
  controllers: [CourseCodeController],
  providers: [CourseCodeService],
})
export class CourseModule {}
