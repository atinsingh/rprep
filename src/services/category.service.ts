import { ExecutionContext, Inject, Injectable, Logger, Request } from '@nestjs/common';
import { FindManyOptions, MongoRepository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CourseCategory } from '../model/category/course.category.entity';



@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CourseCategory) private catRepo: MongoRepository<CourseCategory>){}

  async saveCategory(category: CourseCategory, user='') : Promise<CourseCategory>{
   // category.createdBy = this.request.user.id==undefined? '': this.request.user.id;
    category.createdDate = new Date();
    Logger.log(`${category}`)
    return await this.catRepo.save(category);
  }

  async findOne(id: string): Promise<CourseCategory> {
    return await this.catRepo.findOne(id);
  }
/*
        this need to fixed 
    */
  async findAll(): Promise<CourseCategory []> {
    return await this.catRepo.find();
  }

  async findByCategoryName(cat: string) : Promise<CourseCategory[]> {
    return await this.catRepo.find({category:cat});
  }
}
