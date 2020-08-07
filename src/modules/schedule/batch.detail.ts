import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BatchTypeEnum } from './batch.type.enum';

export class BatchDetail {

  @ApiProperty({
    title:'Batch Time'
  })
  @Column()
  batchTime: string [];

  @ApiProperty({
    title: 'Course Type'
  })
  @Column()
  type: BatchTypeEnum;

  @ApiProperty()
  @Column()
  days: string[];

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty()
  @Column()
  instructorImageUrl: string;

  @ApiProperty()
  @Column()
  instructorName: string;

  @ApiProperty()
  @Column()
  location: string | '200 Matheson Blvd ';

  @ApiProperty()
  @Column()
  startDate: string;
}
