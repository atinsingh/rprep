
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class MetaData {
  @ApiProperty({description: "creator of code"})
  @Column({ nullable: true })
  createdBy?: string;

  @Column({ nullable: true })
  lastModifiedBy?: string;

  @Column({ nullable: true })
  createdDate?: Date;

  @Column({ nullable: true })
  lastModifiedDate?: Date

  @ApiProperty({example: "1"})
  @Column()
  version: number;
}
