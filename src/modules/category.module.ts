import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub.category.service';
import { CourseCategory } from '../model/category/course.category.entity';
import { CourseSubCategory } from '../model/category/course.sub.category.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CourseCategory, CourseSubCategory])],
  controllers: [CategoryController],
  providers: [CategoryService,SubCategoryService]

})
export class CategoryModule {
}
