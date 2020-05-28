import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../../model/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Orders])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
