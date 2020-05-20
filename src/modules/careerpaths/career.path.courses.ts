import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CareerPathCourses {

  @ApiProperty({description: 'ID of program'})
  @Column('string')
  courseId: string;

  @ApiProperty({description: 'Order of pragram 0 lowest'})
  @Column({nullable: false})
  courseOrder: number;
}
