import {Body, Controller, Get, Param, Post, Req, UseInterceptors} from '@nestjs/common';
import {Testimonial} from "./testimonial.entity";
import {TestimonialService} from "./testimonial.service";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {InstructorEntity} from "../../model/instructor.entity";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {LoggingInterceptor} from "../../client/interceptors/logging.interceptor";

@ApiTags('Testimonial')
@Controller('api/testimonial')
@UseInterceptors(LoggingInterceptor)
export class TestimonialController {


    constructor(private testimonialService: TestimonialService) {
    }

    @ApiResponse({
        status: 200,
        description: 'Testimonial posted to LMS',
        isArray: true,
        type: Testimonial
    })
    @Get()
     getAll(@Param() param): Testimonial[] | any {
        //prepare the query here.
        const options: {} = param===undefined ? {}: param;
        return this.testimonialService.getAllTestimonialWithSelection(options);
    }

    @Post()
    async creatNewTestimonial(@Body() testimonial: Testimonial) : Promise<Testimonial | any> {
        // do proper hanlding here
        return await this.testimonialService.createTestimonial(testimonial);
    }


    @Post('saveall')
    @ApiResponse({
        status: 201,
        description: 'Created SuccessFully',
        isArray: true,
        type: Testimonial
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request'
    })
    @ApiBody({
        type: Testimonial,
        isArray: true
    })
    async creatAll(@Body() testimonials: Testimonial[]) : Promise<Testimonial [] | any> {
        // do proper hanlding here
        return await this.testimonialService.createMultiTestimonial(testimonials);
    }




}
