import { ExecutionContext, Inject, Injectable, Logger, Request } from '@nestjs/common';
import { FindManyOptions, MongoRepository } from 'typeorm';
import { CourseCategory } from '../domain/category/course.category.entity';
import { InjectRepository } from '@nestjs/typeorm';



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

  async findAll(): Promise<CourseCategory []> {
    return await this.catRepo.find();
  }

  async findByCategoryName(cat: string) : Promise<CourseCategory[]> {
    return await this.catRepo.find({category:cat});
  }
}