import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InstructorEntity } from "../../model/instructor.entity";
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';

@Module({
    imports: [TypeOrmModule.forFeature([InstructorEntity])],
    providers: [InstructorService],
    controllers: [InstructorController]
})
export class InstructorModule {

}
