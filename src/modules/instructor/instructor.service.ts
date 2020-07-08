import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InstructorEntity} from "../../model/instructor.entity";
import {MongoRepository} from "typeorm";

@Injectable()
export class InstructorService {
    constructor(@InjectRepository(InstructorEntity) private repo: MongoRepository<InstructorEntity> ) { }

    async saveAll(instructors : InstructorEntity []): Promise<InstructorEntity []> {
        // add validation here
        instructors.forEach(i=>{
            i.createdDate = new Date();
            i.lastModifiedDate = new Date();
        })

        return await this.repo.save(instructors);
    }

    async findAll(): Promise<InstructorEntity []> {
        return await this.repo.find({});
    }
}
