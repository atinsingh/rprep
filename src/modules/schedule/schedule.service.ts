import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';
import { MongoRepository } from 'typeorm';
import { CourseInfoService } from '../courseinfo/course-info.service';
import { BadDataException } from '../../exceptions/bad.data.exception';

@Injectable()
export class ScheduleService {

    constructor(
      @InjectRepository(ScheduleEntity)
      private repo: MongoRepository<ScheduleEntity> ,
      private courseService: CourseInfoService
      ) {}

    public async saveSchedule(entity: ScheduleEntity) : Promise<ScheduleEntity | any> {
       const  id = entity.courseId;
       const courseinfo = await this.courseService.getCourseById(id);
       if(courseinfo === null || courseinfo===undefined){
         throw new BadDataException(400,'Please pass a valid id', 400);
         return ;
       }
       return await this.repo.save(entity);

    }

    public async getScheduleByCourseId(id: string): Promise<ScheduleEntity | any> {

      const  response = await this.repo.findOne({
        courseId: id
      });
      if(response===undefined || response===null){
        throw new BadDataException(404,`No schedule found for Id, kindly verify the course id:  ${id}`, 404)
        return ;
      }
      Logger.log(`Received following from MongoDB ${JSON.stringify(response)}`)
      return response;
    }
}
