import { Module } from '@nestjs/common';
import { PurchasedCourseController } from './purchasedcourse.controller';
import { PurchasedCourseService } from './purchasedcourse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasedCourse } from '../../model/purchasedcourse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedCourse])],
  controllers: [PurchasedCourseController],
  providers: [PurchasedCourseService],
})
export class PurchasedCourseModule {}
