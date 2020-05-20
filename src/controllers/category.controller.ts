import { Body, Controller, Post } from '@nestjs/common';
import { CourseCategory } from '../domain/category/course.category.entity';
import { CategoryService } from '../services/category.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { SubCategoryService } from '../services/sub.category.service';
import { CourseSubCategory } from '../domain/category/course.sub.category.entity';

@ApiTags('Categories & Sub Categories')
@Controller('/api/category')
export class CategoryController {
    constructor(private catSerive: CategoryService, private subCatService: SubCategoryService){}

    @Post("/")
    async saveCat(@Body() cat: CourseCategory): Promise< CourseCategory| any > {
      return await this.catSerive.saveCategory(cat);
    }

    @Post('/sub')
    async saveSubCategory(@Body() sub: CourseSubCategory): Promise<CourseSubCategory> {
      return await this.subCatService.saveSubCategory(sub);
    }
}