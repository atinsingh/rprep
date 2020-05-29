import { Entity, Column, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base/base.entity';
import { User } from './user.entity';
import { Orders } from './order.entity';
import { CourseCodes } from './coursecode.entity';
import { CourseCalender } from './coursecalendar.entity';

@Entity()
export class PurchasedCourse extends BaseEntity {
  @ApiProperty({ description: 'Order id from order table' })
  @OneToOne(
    () => Orders,
    order => order.orderId,
  )
  orderId: string;

  @ApiProperty({ description: 'Course id' })
  @OneToOne(
    () => CourseCodes,
    courseCodes => courseCodes.id,
  )
  @Column()
  courseId: string;

  @ApiProperty({ description: 'Course Calender id' })
  @OneToOne(
    () => CourseCalender,
    courseCalender => courseCalender.calendarId,
  )
  @Column()
  calenderId: string;

  @ApiProperty({ description: 'User id' })
  @OneToOne(
    () => User,
    user => user.id,
  )
  @Column()
  userId: string;

  @Column({ nullable: false })
  createdDate?: Date;
}
