import { CourseCalender } from '../model/coursecalendar.entity';
import { MongoRepository } from 'typeorm';

export class CourseCalenderRepository extends MongoRepository<CourseCalender> {}
