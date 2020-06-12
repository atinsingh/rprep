import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import {Testimonial} from "./testimonial.entity";
import {TestimonialService} from "./testimonial.service";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {InstructorEntity} from "../../model/instructor.entity";

@ApiTags('Testimonial')
@Controller('api/testimonial')
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




}
