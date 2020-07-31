import { Column, Entity, ObjectID } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../model/base/base.entity';

enum ContactStatusEnum {
    NEW,CLOSED, LEAD, NOT_REACHABLE
}

@Entity()
export class ContactDto extends BaseEntity{

    @ApiProperty({description: 'Email of student'})
    @Column()
    email: string;

    @ApiProperty({description: 'First Name of student'})
    @Column()
    firstname: string;

    @ApiProperty({description: 'Last Name of student'})
    @Column()
    lastname: string;

    @ApiProperty({description: 'Website of student'})
    @Column()
    website:string;

    @ApiProperty({description: 'Message of student'})
    @Column()
    company:string

    @ApiProperty({description: 'Phone of student'})
    @Column()
    phone: string;

    @ApiProperty({description: 'Address of student'})
    @Column()
    address: string;

    @ApiProperty({description: 'City of student'})
    @Column()
    city: string;

    @ApiProperty({description: 'State of student'})
    @Column()
    state: string;

    @ApiProperty({description: 'Zip of student'})
    @Column()
    zip: string

    @ApiProperty({description: 'Message of student'})
    @Column()
    msg: string

    status: ContactStatusEnum;
}
