import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Orders } from '../../model/order.entity';
// import *  as fast from 'fast-json-patch';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OrderService {

    constructor(@InjectRepository(Orders) private readonly      OrderRepository: MongoRepository<Orders>) {
    }

    async findById(id: string): Promise<Orders | undefined> {
        const result = await this.OrderRepository.findOne(id);
        return result;
    }

    async findAll(): Promise<Orders[]> {
        return this.OrderRepository.find();
    }

    
    async find(id: string): Promise<Orders | undefined> {
        const result = await this.OrderRepository.findOne(id);
        return result;
    }


    async create(input: Orders): Promise<Orders> {
        return this.OrderRepository.save(input);
    }

    async save(order: Orders): Promise<Orders | undefined> {
        const result = await this.OrderRepository.save(order);
        return result;
    }

    async update(order: Orders): Promise<Orders | undefined> {
        return await this.save(order);
    }

    async delete(order: Orders): Promise<Orders | undefined> {
        return await this.OrderRepository.remove(order);
    }
}
