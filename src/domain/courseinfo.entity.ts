import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from './metadata.subentity';
import { StatusEnum } from './enums/status.enum';
import { CourseReview } from './course.review';
import { IsString } from 'class-validator';

@Entity("courseinfo")
export class CourseInfo{

    @ObjectIdColumn()
    @ApiProperty({ example: '66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff', description: 'Entity id' })
    id?: string;

    @ApiProperty({example:'JAVA-SEL', description: 'Course Code for P&L'})
    @Column({nullable:false})
    courseCode: string;

    @ApiProperty({type:'string', required: true, example: 'Java Full stack developer'})
    @Column({nullable: false})
    @IsString()
    courseName: string;

    @ApiProperty({type: 'string',required: true, example: "Learn java with experts etc"})
    @Column({nullable:false})
    shortDescription: string;

    @ApiProperty({description:'Long description of the course'})
    @Column({nullable:false})
    description : string;

    @Column(type => MetaData)
    metadata: MetaData;

    @ApiProperty({description: 'author_id'})
    @Column()
    author: string;

    @ApiProperty({description:'url of thumbnail', example:'/java.png'})
    @Column()
    thumbnailUrl: string;

    @ApiProperty({description: "id of instructor"})
    @Column()
    instructor: string;

    @ApiProperty({enum: ['OFFLINE', 'ONLINE'], description:'delivery mode'})
    @Column()
    deliveryMode: string [];

    @ApiProperty({description: 'ID of company owns the course'})
    @Column()
    companyId: string;

    @ApiProperty({description: 'Location ids where program is being delivered'})
    @Column()
    deliveryLocation: object []

    @ApiProperty({
            enum: ['APPROVED','SUSPENDED','CANCELLED','NEW','CLOSED', 'OPEN'],
            description: 'Status of program it should follow the workflow'
            })
    @Column()
    status: StatusEnum;
    @ApiProperty({
          description: 'Set to true if program is approved'
    })
    @Column()
    approved: boolean

    @Column()
    approvedBy: string;

    @Column()
    internalRating: number;

    @Column()
    externalRating: number;

    @ApiProperty({description: 'Review associated with course'})
    @Column(type => CourseReview)
    reviews : CourseReview [];

}
