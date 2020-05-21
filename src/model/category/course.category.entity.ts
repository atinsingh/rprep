import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('category')
export class CourseCategory extends BaseEntity{

  @ApiProperty({description: 'Category'})
  @Column({nullable:false, unique: true})
  category: string;

  @ApiProperty({description: 'description of category'})
  @Column()
  description: string;

  @ApiProperty({description: 'Tag Associated with category'})
  @Column()
  tags: string [];
}