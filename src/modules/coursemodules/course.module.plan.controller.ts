import {Controller, Get, Logger, Param, Res} from '@nestjs/common';
import {CourseModulePlanService} from "./course.module.plan.service";
import {ApiParam, ApiTags} from "@nestjs/swagger";
import {stringify} from "querystring";
import {BadDataException} from "../../exceptions/bad.data.exception";

@Controller('api/course/module')
@ApiTags("Courses")
export class CourseModulePlanController {
    constructor(private moduleService: CourseModulePlanService) {
    }

    @Get("/:uuid")
    @ApiParam({
        name: 'uuid',
        type: 'string'
    })
    getAllModulesForCourse(@Param() param) {
         return  this.moduleService.getModuleForACourse(param.uuid);
    }
}
