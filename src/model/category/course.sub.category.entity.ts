import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CourseSubCategory extends BaseEntity{

  @Column({nullable:false})
  categories: string [];

  @Column({nullable:false})
  sub_category: string;

  @Column({nullable: true})
  description: string;
}