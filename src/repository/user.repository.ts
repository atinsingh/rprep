import { User } from '../model/user.entity';
import { MongoRepository } from 'typeorm';

export class UserRepository extends MongoRepository<User>{

}
