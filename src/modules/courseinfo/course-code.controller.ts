import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseCodeService } from './course-code.service';
import {  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CourseCodes } from '../../model/coursecode.entity';

@ApiTags('Courses')
@Controller('api/course-code')
export class CourseCodeController {
  constructor(private codeService: CourseCodeService) {
  }

  @Get("/")
  @ApiResponse({
    status: 200,
    type: CourseCodes,
    isArray: true
  })
  async getAllCode(): Promise<CourseCodes [] | any> {
    return await this.codeService.findAll({});
  }


  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CourseCodes
  })
  async createOne(@Body() courseCode: CourseCodes): Promise<CourseCodes | any> {
    return await this.codeService.saveSingleCode(courseCode);
  }


  @Post("/expire/:id")
  expireCode(@Param() params) : Promise<CourseCodes | any> {
    const id  = params.id;
    return this.codeService.expireCode(id);
  }

  @ApiOperation({operationId: 'patchCodes', description: 'Add data to patch'})
  @ApiResponse({
    status: 201,
    description:'Patch succeed',
    type: CourseCodes
  })
  @Patch("patch/:id")
  async patchDocument(@Param() params, @Body() body) : Promise<CourseCodes> {
    const id = params.id;
    console.log(body);
    return await this.codeService.applyPatch(id,body);
  }
}
