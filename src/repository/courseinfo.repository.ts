import { MongoRepository } from 'typeorm';
import { CourseInfo } from '../domain/courseinfo.entity';

export class CourseInfoRepository extends MongoRepository<CourseInfo>{
 // private manager = getMongoManager();
}
