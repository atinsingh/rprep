import { DiscussionComments } from './discussion.comments';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class DiscussionReply {

    @ApiProperty({description: 'User id of user who replied'})
    @Column()
    replyUserId: string;

    @ApiProperty({description: 'reply text'})
    @Column()
    replyText: string;

    @ApiProperty({description: 'Associated Media with reply'})
    @Column()
    media: string []; // will be replaced with audio video
    vote: number;
    comments: DiscussionComments [];

    @Column()
    createDate: Date;

    @Column()
    updateDate: Date;
}
