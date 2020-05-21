import { MongoRepository } from 'typeorm';
import { CourseCodes } from '../model/coursecode.entity';

export class CourseCodeRepository extends MongoRepository<CourseCodes>{
  
}
