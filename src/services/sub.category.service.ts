import { MongoRepository } from 'typeorm';
import { CourseSubCategory } from '../domain/category/course.sub.category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { BadDataException } from '../exceptions/bad.data.exception';

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

    return await this.subCatRepo.save(subCategory);
  }

  // async findAssociatedSubCat(cat: string): Promise<CourseSubCategory[]> {
  //    return await this.subCatRepo.find({categories: {$elemMatch : {$eq: {cat}}} });
  // }

}