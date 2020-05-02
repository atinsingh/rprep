import { Column, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from './enums/status.enum';


export class CourseReview {

  @ApiProperty({description:'Review ID for the review'})
  @ObjectIdColumn()
  id?:string;

  @ApiProperty({description: 'Reviver Name -> First & Last | Aur Supplied Name'})
  @Column()
  reviewer: string;

  @ApiProperty({description: 'Date of Review'})
  @Column()
  reviewDate: Date;

  @ApiProperty({description: 'Review Stars'})
  @Column()
  reviewStar: number;

  @ApiProperty({description:'Review comments'})
  @Column()
  reviewComments: string

  @ApiProperty({description: 'Status of Review'})
  @Column()
  status: StatusEnum

  @ApiProperty({description: 'Programs review'})
  @Column()
  programId: string;

}
