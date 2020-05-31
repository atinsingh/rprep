import { PurchasedCourseService } from './purchasedcourse.service';
import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { PurchasedCourse } from '../../model/purchasedcourse.entity';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../../security';

@Controller('api/purchased-order')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('Purchased Course')
export class PurchasedCourseController {
  constructor(
    private readonly purchasedCourseService: PurchasedCourseService,
  ) {}

  @Get()
  @ApiResponse({
    type: PurchasedCourse,
    status: 200,
  })
  async getPuchasedOrder(): Promise<PurchasedCourse[]> {
    return await this.purchasedCourseService.findAll();
  }

  @Post()
  createPuchasedOrder(
    @Body() purchasedCourse: PurchasedCourse,
  ): Promise<PurchasedCourse> {
    return this.purchasedCourseService.create(purchasedCourse);
  }
}
