import { Controller, Get, Logger, Param, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { CourseInfo } from '../../model/courseinfo.entity';
import { CourseInfoService } from './course-info.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Utils } from '../../utiils/utils';
import { AuthGuard, RolesGuard } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/course-info')
@ApiTags('CourseInfo')
@UseInterceptors(LoggingInterceptor)

export class CourseInfoController {

    constructor(private service:CourseInfoService) {
    }
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Get("/")
    getAllCourseInfo(@Query() query) : Promise< CourseInfo[]| undefined>{
        Logger.debug(`Query Param received `)
        const options = {status : Utils.getStatusEnumFromString(query.status)}
        return this.service.getAllCourseInfo(options);
    }

    @Get("/:id")
    getAllCourseById(@Request() req, @Param() param) : Promise< CourseInfo | undefined>{
        Logger.debug(`Received request for the course id ${param.id} `)
        console.log(req.user)
        return this.service.getCourseById(param.id);
    }


}
