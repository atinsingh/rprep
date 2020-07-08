import {Body, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {InstructorService} from "./instructor.service";
import {InstructorEntity} from "../../model/instructor.entity";
import {LoggingInterceptor} from "../../client/interceptors/logging.interceptor";

@Controller('api/instructor')
@UseInterceptors(LoggingInterceptor)
export class InstructorController {
    constructor(private service: InstructorService) {
    }

    @Post("")
    saveAll(@Body() instructors: InstructorEntity []) : Promise<InstructorEntity []> {
        return this.service.saveAll(instructors);
    }

    @Get("")
    getAllInstructors() : Promise<InstructorEntity []> {
        return this.service.findAll();
    }



}
