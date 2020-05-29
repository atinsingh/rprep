import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base/base.entity';

@Entity()
export class CourseCalender extends BaseEntity {
  @ApiProperty({ uniqueItems: true, description: 'Unique Order Id to Display' })
  @PrimaryColumn({ unique: true })
  calendarId: string;
}
