import { PurchasedCourse } from '../model/purchasedcourse.entity';
import { MongoRepository } from 'typeorm';

export class PurchasedCourseRepository extends MongoRepository<PurchasedCourse> {}
