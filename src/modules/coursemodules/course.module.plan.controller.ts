import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import {CourseModulePlanService} from "./course.module.plan.service";
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {stringify} from "querystring";
import {BadDataException} from "../../exceptions/bad.data.exception";
import { CourseModulePlanEntity } from '../../model/course.module.plan.entity';
import { ExtractJwt } from 'passport-jwt';
import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;

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

    @Post("/:uuid")
    @ApiParam({
        name: 'uuid',
        type: 'string'
    })
    @ApiResponse({
        type: CourseModulePlanEntity
    })
    createModule(@Param('uuid') uuid, @Body() module: CourseModulePlanEntity) : Promise<CourseModulePlanEntity> {
        return this.moduleService.addAModule(uuid, module);
    }


}
