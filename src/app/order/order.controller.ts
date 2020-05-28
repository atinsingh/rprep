import { OrderService } from './order.service';
import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Orders } from '../../model/order.entity';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../../security';

@Controller('api/order')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('Orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {

    }

    @Get()
    @ApiResponse({
        type: Orders,
        status: 200
    })
    async getOrder(): Promise<Orders[]> {
        return await this.orderService.findAll()
    }

    @Post()
    createOrder(@Body() order: Orders): Promise<Orders> {
        return this.orderService.create(order);
    }

}
