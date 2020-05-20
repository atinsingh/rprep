import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeEnum } from './enums/lesson.type.enum';

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

  @ApiProperty({description: 'Course Duraration in mins, ui should covert this to proper format'})
  @Column()
  duration: number;

  @ApiProperty({description: 'Order of Lesson'})
  orderSeq: number;

  @ApiProperty({description: 'Content type of lesson'})
  @Column()
  lessonType: LessonTypeEnum.VIDEO

}