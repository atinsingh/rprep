import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from './enums/status.enum';
import { BaseEntity } from './base/base.entity';

@Entity('instructor')
export class InstructorEntity extends BaseEntity{

    @Column()
    firstName: string;
    @Column()
    lastName:string;

    @Column()
    bio: string;

    @Column()
    social: {}

    @Column()
    programs: []

    @Column()
    company: string

    @Column()
    position: string;

    @Column()
    status: StatusEnum;

    @Column()
    deliveryLocation: [];

    @Column()
    certifications: string [];

    @Column()
    reviews : []

    @Column()
    rating: number;

    @Column()
    userID: string;

}
