import { MongoRepository } from 'typeorm';
import { CourseInfo } from '../model/courseinfo.entity';

export class CourseInfoRepository extends MongoRepository<CourseInfo>{
 // private manager = getMongoManager();
}
