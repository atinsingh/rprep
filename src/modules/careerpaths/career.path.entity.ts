
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CareerPathCourses } from './career.path.courses';
import { BaseEntity } from '../../model/base/base.entity';
import { Stats } from '../../model/stats';


export class CareerPathEntity extends BaseEntity{

  @ApiProperty({description: 'Career Path Code'})
  @Column({unique: true})
  code: string;

  @ApiProperty({description: 'Name of Career Path'})
  @Column()
  name: string;

  @ApiProperty({description: 'Short description of career path'})
  @Column()
  shortDesc: string;

  @ApiProperty({description: 'Description of career path'})
  @Column()
  description: string;


  @ApiProperty({description: 'Array of Programing in career path'})
  @Column(type => CareerPathCourses)
  courses: CareerPathCourses[];

  @ApiProperty({description: 'Stats of careerPath'})
  @Column(type => Stats)
  stats: Stats;

}
