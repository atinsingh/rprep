import { MongoRepository } from 'typeorm';
import { CourseCodes } from '../domain/coursecode.entity';

export class CourseCodeRepository extends MongoRepository<CourseCodes>{
  
}
