import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from './metadata.subentity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { StatusEnum } from './enums/status.enum';


@Entity("coursecodes")
export class CourseCodes {
  @ObjectIdColumn()
  @ApiModelProperty({ example: '66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff', description: 'Entity id' })
  @ApiProperty({ example: '66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff', description: 'Entity id' })
  id?: string;

  @Column({unique: true})
  @ApiModelProperty({example: "JAVA101",description:"unique course code"})
  code: string;

  @ApiModelProperty({example:'Metadata'})
  @Column(type => MetaData )
  metadata: MetaData;

  @ApiModelProperty({example: "ABC"})
  @Column()
  costCenter: string;

  @ApiModelProperty({example: "ABC"})
  @Column()
  profitCenter: string;

  @ApiModelProperty({enum:['ACTIVE','EXPIRED','CANCELLED','SUSPENDED'], example: 'ACTIVE , EXPIRED'})
  @Column()
  status: StatusEnum;

  @ApiModelProperty({description: 'Indicated if code is expired'})
  @Column()
  expired: boolean;

  @ApiModelProperty({description: 'Date when code was expired our expired'})
  @Column()
  expiryDate: Date;

}
