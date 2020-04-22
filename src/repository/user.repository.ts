import { User } from '../domain/user.entity';
import { MongoRepository } from 'typeorm';

export class UserRepository extends MongoRepository<User>{

}
