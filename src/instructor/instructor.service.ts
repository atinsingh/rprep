import { Injectable } from '@nestjs/common';
import { InstructorEntity } from '../model/instructor.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstructorService {
  constructor( @InjectRepository(InstructorEntity) private repo: MongoRepository<InstructorEntity>) {}

  async createOne(instructor: InstructorEntity) : Promise<InstructorEntity> {
    // do validation here.
    return  this.repo.save(instructor);
  }

  async getAllInstructors(options: {}={}) : Promise<InstructorEntity []> {
    return this.repo.find(options);
  }

}
