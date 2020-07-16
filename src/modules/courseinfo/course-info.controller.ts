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

import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { CourseInfoService } from './course-info.service';
import { ImageRepository } from '../../repository/image.repository';
import { CourseInfo } from '../../model/courseinfo.entity';
import { Utils } from '../../utiils/utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseReview } from '../../model/course.review';
import { ImageData } from './image.data';
import { ObjectID } from 'typeorm';
import { RelatedRequestDto } from '../../model/dto/related.request.dto';


@ApiTags('Courses')
@Controller('api/course-info')
@UseInterceptors(LoggingInterceptor)
export class CourseInfoController {
    //data: string;
    constructor(private service:CourseInfoService, private imageRepo: ImageRepository) {
    }
    // @UseGuards(AuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @Get("/")
    @ApiResponse({
        type : CourseInfo,
        isArray: true,
        description: 'Returns all the courses',
        status: 200
    })
    @ApiResponse({
        type : Error,
        status: 400
    })
    getAllCourseInfo(@Query() query) : Promise< CourseInfo[]| undefined>{
        Logger.debug(`Query Param received  ${query.status}`)

        const options = query.status!==undefined?{status : Utils.getStatusEnumFromString(query.status)} :{};
        return this.service.getAllCourseInfo(options);
    }

    @ApiParam({
        name: 'id',
        type: 'string'
    })
    @ApiResponse({
        type : CourseInfo,
        description: 'Returns course for specified id',
        status: 200
    })
    @Get("/:id")
    getAllCourseById(@Request() req, @Param() param) : Promise< CourseInfo | undefined>{
        Logger.debug(`Received request for the course id ${param.id} `)
        console.log(req.user)
        return this.service.getCourseById(param.id);
    }

    @ApiParam({
        name: 'id',
        type: 'string'
    })
    @Post(":id/review")
    addReviews(@Body() review: CourseReview, @Param() param) : Promise<CourseInfo | any> {
        Logger.log(`Adding Review to course id ${param.id}`);
        return this.service.addReviewToCourse(review,param.id);
    }

    @ApiParam({
        name: 'id',
        type: 'string'
    })
    @Get(":id/review")
    getReviews(@Param() param) : Promise<CourseReview [] | any> {
        Logger.log(`Adding Review to course id ${param.id}`);
        return this.service.getReviewForACourse(param.id);
        //return this.service.addReviewToCourse(review,param.id);
    }


    @ApiParam({
        name: 'name',
        type: 'string'
    })
    @Get("/coursename/:name")
    getReviewsByCanonicalName(@Param('name') param) : Promise<CourseReview [] | any> {
        Logger.log(`Adding Review to course id ${param}`);
        return this.service.getCourseInfoByCanonicalName(param);
        //return this.service.addReviewToCourse(review,param.id);
    }



    /**
     * Upload Image to course Info
     * @param id
     * @param file
     */

    @Post(':id/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('id') id: string,@UploadedFile() file): Promise<ImageData> {

        const imgid =  await this.imageRepo.saveImage(file);
        const data : ImageData = {
            id: imgid,
            filename: file.originalname,
            mimeType: file.mimetype
        }
        const imgData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        console.log(id)
        return await this.service.saveImage(id,imgData);
    }



    @Post(':id/upload/careerpath')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCareerFile(@Param('id') id: string,@UploadedFile() file): Promise<ImageData> {

        const imgid =  await this.imageRepo.saveImage(file);
        const data : ImageData = {
            id: imgid,
            filename: file.originalname,
            mimeType: file.mimetype
        }
        const imgData = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        console.log(id)
        return await this.service.updateCareerPathImage(id,imgid);
    }


    @Get('images/:imgid')
    async getImage(@Param() param, @Res() res): Promise<any> {
        res.setHeader('Content-type','image/jpeg');
        await this.imageRepo.getImageById(param.imgid).on('data', data=> {
            return res.end({data: data.toString('base64')});
        });
    }

    @ApiBody({
        type: RelatedRequestDto,
        description: 'related programs'
    })
    @ApiParam({
        name:'id',
        type: 'string',
        example:'5f0b392779202c7fd738a7dc'
    })
    @Post(':id/related')
    async addRelatedProgram(@Param('id') id: string, @Body() relatedProgram: RelatedRequestDto) : Promise<CourseInfo | any>{
        return  await this.service.addRelatedProgram(id,relatedProgram.relatedPrograms);
    }



    @ApiBody({
        type: RelatedRequestDto,
        description: 'related programs'
    })
    @Post('related')
    async getRelateProgram(@Body() relatedProgram: RelatedRequestDto) : Promise<CourseInfo | any>{
        return  await this.service.getAllRelatedCourseInfo(relatedProgram);
    }


    @Post()
    @ApiResponse({
        type: CourseInfo
    })
    async addCourseInfo(@Body() courseInfo: CourseInfo): Promise<CourseInfo|any> {
        return await this.service.saveCourse(courseInfo,undefined);
    }





}
