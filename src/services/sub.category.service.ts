import { MongoRepository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { BadDataException } from '../exceptions/bad.data.exception';
import { CourseSubCategory } from '../model/category/course.sub.category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(CourseSubCategory) private subCatRepo: MongoRepository<CourseSubCategory>,
    private categoryService: CategoryService
  ){}

  async saveSubCategory(subCategory: CourseSubCategory): Promise<CourseSubCategory> {
    //verify category are good
    await  subCategory.categories.forEach((id)=>{
       const cat =  this.categoryService.findOne(id);
       if(cat==undefined || cat == null){
         throw new BadDataException(400,'Category does not matches',400)
       }
    })
    // What is this , shoudl have proper validation
    return await this.subCatRepo.save(subCategory);
  }

  // async findAssociatedSubCat(cat: string): Promise<CourseSubCategory[]> {
  //    return await this.subCatRepo.find({categories: {$elemMatch : {$eq: {cat}}} });
  // }

}
