import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeEnum } from './enums/lesson.type.enum';
import {LessonAssignment} from "./lesson.assignment";

export class CourseLesson {

  module: string; // module id
  @ApiProperty({description:'lesson id'})
  @Column()
  lessonId : string;

  @ApiProperty({description: 'Icon class associated with icon'})
  @Column({default: 'fa fa-study'})
  icon? : string;

  @Column()
  title: string;

  @ApiProperty({description: 'Lesson Description'})
  @Column()
  description: string;

  @ApiProperty({description: 'Course Duration in minutes, ui should covert this to proper format'})
  @Column()
  duration: number;

  @ApiProperty({description: 'Order of Lesson'})
  orderSeq: number;

  @ApiProperty({description: 'Content type of lesson'})
  @Column()
  lessonType: LessonTypeEnum;

  @ApiProperty({description: 'Content template'})
  @Column()
  htmlTemplate: string;

  @Column()
  contentUrl: string;

  @Column()
  quiz: [];

  @Column()
  inClassAssigment : LessonAssignment [];

  @Column()
  offLineAssignment: LessonAssignment [];

}
