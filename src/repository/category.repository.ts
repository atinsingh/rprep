import { EntityRepository, MongoRepository } from 'typeorm';
import { CourseCategory } from '../model/category/course.category.entity';

export class CategoryRepository extends MongoRepository<CourseCategory>{}
