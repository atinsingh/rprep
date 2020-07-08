import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CourseModulePlanEntity} from "../../model/course.module.plan.entity";
import {MongoRepository} from "typeorm";
import {CourseInfoService} from "../courseinfo/course-info.service";
import {BadDataException} from "../../exceptions/bad.data.exception";
import {StatusEnum} from "../../model/enums/status.enum";
import {CourseLesson} from "../../model/course.lesson";


@Injectable()
export class CourseModulePlanService {

    constructor(@InjectRepository(CourseModulePlanEntity) private repo: MongoRepository<CourseModulePlanEntity>,
                private courseInfoService: CourseInfoService
                ) {
    }

    /**
     * Save a module in the database and update course info for module
     */
    async addAModule(module: CourseModulePlanEntity): Promise<CourseModulePlanEntity | any> {
           if( this.courseInfoService.getCourseInfoByUuid(module.courseUUID)==null ) {
               new BadDataException(400,'Invalid UUID',400);
               return ;
           }
           module.status = StatusEnum.NEW;
           return await this.repo.save(module);
    }

    async getModuleForACourse(uuid: string) : Promise<CourseModulePlanEntity [] | any >{
        const response = await this.courseInfoService.getCourseInfoByUuid(uuid)

        if( response === null || response === undefined ) {
            return new BadDataException(400,'Invalid UUID',400)
        }
        return response;
    }

    async addLesson(moduleId: string, lesson: CourseLesson) : Promise<CourseModulePlanEntity | any> {
        // check if program uuid is correct.
        const course : CourseModulePlanEntity = await this.repo.findOne(moduleId);
        if(course===null || course === undefined) {
            return new BadDataException(400, 'Invalid Module Id', 400)
        }
        // check if module is available

        const lessons: CourseLesson []  = course.lessons;

        lessons.push(lesson);
    }
}
