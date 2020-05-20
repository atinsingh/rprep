import { EntityRepository, MongoRepository } from 'typeorm';
import { CourseCategory } from '../domain/category/course.category.entity';
export class CategoryRepository extends MongoRepository<CourseCategory>{}