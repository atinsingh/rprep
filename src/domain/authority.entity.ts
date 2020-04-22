import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';



@Entity('authority')
export class Authority {

  @ObjectIdColumn()
  id?: ObjectID;

  @ApiProperty({ example: 'ROLE_USER', description: 'User role' })
  @Column()
  name: string;

}
