import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CourseOverview  {

    @ApiProperty({description: 'Title of Program'})
    @Column()
    title: string;

    @ApiProperty({description: 'Description of Program'})
    @Column()
    description: string;

    @ApiProperty({description: 'Hightlights'})
    @Column()
    highlights: string[]



}