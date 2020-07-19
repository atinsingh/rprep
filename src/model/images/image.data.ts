import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ImageTypeEnum } from './image.type.enum';


export class ImageData {
    @ApiProperty({description: 'Image id from Mongodb'})
    @Column()
    id : string;

    @ApiProperty({})
    filename: string;

    @Column()
    mimeType: string;

    @Column()
    imageType: ImageTypeEnum
}
