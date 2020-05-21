import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class ImageData {
  @ApiProperty({description: 'Image id from Mongodb'})
  @Column()
  id : string;

  @ApiProperty({})
  filename: string;

  @Column()
  mimeType: string;
}
