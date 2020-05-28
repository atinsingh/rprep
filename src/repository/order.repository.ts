import { Orders } from '../model/order.entity';
import { MongoRepository } from 'typeorm';

export class OrderRepository extends MongoRepository<Orders>{

}
