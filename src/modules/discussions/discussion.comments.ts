import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class DiscussionComments {

    @ApiProperty({description: 'id of user who commented'})
    @Column()
    commenter:  string

    @Column()
    comment: string;

    @Column()
    dateCreated: Date;

    @Column()
    dateUpdated: Date;

    @Column()
    markedAbusive: boolean;

    @Column()
    totalMarked: number;

    @Column()
    media: [];

}