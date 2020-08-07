import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../model/base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BatchDetail } from './batch.detail';

@Entity('schedule')
export class ScheduleEntity extends BaseEntity{
  @ApiProperty({
    title: 'Course Id',
    description: 'CourseId should match with courseinfo entity'
  })
  @Column()
  courseId: string;

  @ApiProperty({
    type: BatchDetail, isArray: true
  })
  @Column(type => BatchDetail)
  batches: BatchDetail[]

}

