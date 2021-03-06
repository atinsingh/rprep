import { ObjectIdColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {

  @ObjectIdColumn()
  @ApiProperty({ example: '66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff', description: 'Entity id' })
  id?: string;

  @Column({ nullable: true })
  createdBy?: string;
  @Column({ nullable: true })
  createdDate?: Date;
  @Column({ nullable: true })
  lastModifiedBy?: string;
  @Column({ nullable: true })
  lastModifiedDate?: Date;
}
