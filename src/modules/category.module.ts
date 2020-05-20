import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategory } from '../domain/category/course.category.entity';
import { CourseSubCategory } from '../domain/category/course.sub.category.entity';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub.category.service';



@Module({
  imports: [TypeOrmModule.forFeature([CourseCategory, CourseSubCategory])],
  controllers: [CategoryController],
  providers: [CategoryService,SubCategoryService]

})
export class CategoryModule {

}