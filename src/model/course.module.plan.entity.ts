import { BaseEntity } from './base/base.entity';
import {Column, Entity, ObjectID} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CourseLesson } from './course.lesson';
import { StatusEnum } from './enums/status.enum';

@Entity('course-modules')
export class CourseModulePlanEntity extends BaseEntity{

  @ApiProperty({description: 'mapped with course', required: true})
  @Column()
  courseUUID: string;
  @ApiProperty({description: 'Name or Title of Module'})
  @Column({nullable:false})
  title: string;

  @ApiProperty({description: 'Description of module'})
  @Column()
  description: string;

  @ApiProperty({description:'lessons attached with module', type: CourseLesson, isArray: true})
  @Column(type => CourseLesson)
  lessons: CourseLesson[]

  @ApiProperty({description: 'Duration of the lesson in minute, 0 for non determined'})
  @Column()
  length: number;

  @ApiProperty({description: 'Order of the module should display'})
  order : number;

  @Column()
  status: StatusEnum;
}
