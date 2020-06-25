
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class MetaData {
  @ApiProperty({description: "creator of code"})
  @Column({ nullable: true })
  createdBy?: string;

  @ApiProperty({description: 'User modified the data'})
  @Column({ nullable: true })
  lastModifiedBy?: string;

  @ApiProperty({description: 'date ', format:'dd-mmm-yyyy', example:'03-Jul-2020'})
  @Column({ nullable: true })
  createdDate?: Date;

  @ApiProperty({description: 'date ', format:'dd-mmm-yyyy', example:'03-Jul-2020'})
  @Column({ nullable: true })
  lastModifiedDate?: Date

  @ApiProperty({example: 1})
  @Column()
  version: number
}
