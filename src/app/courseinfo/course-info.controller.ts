import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Query,
    Request, Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { CourseInfoService } from './course-info.service';
import { ImageRepository } from '../../repository/image.repository';
import { CourseInfo } from '../../model/courseinfo.entity';
import { Utils } from '../../utiils/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseReview } from '../../model/course.review';
import { ImageData } from './image.data';





@Controller('api/course-info')
@ApiTags('CourseInfo')
@UseInterceptors(LoggingInterceptor)

export class CourseInfoController {
    data: string;
    constructor(private service:CourseInfoService, private imageRepo: ImageRepository) {
    }
    // @UseGuards(AuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Get("/")
    @ApiResponse({
        type : CourseInfo,
        status: 200
    })
    @ApiResponse({
        type : Error,
        status: 400
    })
    getAllCourseInfo(@Query() query) : Promise< CourseInfo[]| undefined>{
        Logger.debug(`Query Param received `)

        const options = query.status!=undefined?{status : Utils.getStatusEnumFromString(query.status)} :{};
        return this.service.getAllCourseInfo(options);
    }

    @Get("/:id")
    getAllCourseById(@Request() req, @Param() param) : Promise< CourseInfo | undefined>{
        Logger.debug(`Received request for the course id ${param.id} `)
        console.log(req.user)
        return this.service.getCourseById(param.id);
    }

    @Post(":id/review")
    addReviews(@Body() review: CourseReview, @Param() param) : Promise<CourseInfo | any> {
        Logger.log(`Adding Review to course id ${param.id}`);
        return this.service.addReviewToCourse(review,param.id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file): Promise<ImageData> {

        const id =  await this.imageRepo.saveImage(file);
        console.log(file);
        const data : ImageData = {
            id: id,
            filename: file.originalname,
            mimeType: file.mimetype
        }
        return data;
    }

    @Get(':id/img/:imgid')
    async getImage(@Param() param, @Res() res): Promise<any> {
        res.setHeader('Content-type','image/jpeg');
        await this.imageRepo.getImageById(param.imgid).on('data', data=> {
            return res.end({data: data.toString('base64')});
        });
    }

}