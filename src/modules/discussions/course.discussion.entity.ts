import { Column, Entity, ObjectID } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/user.entity';
import { BaseEntity } from '../../domain/base/base.entity';
import { DiscussionReply } from './discussion.reply';

@Entity()
export class CourseDiscussionEntity extends BaseEntity{
  @ApiProperty({description:'id of discussion'})

  @Column()
  courseID: string;

  @Column()
  courseCode: string

  @ApiProperty({description: 'title of discussion'})
  @Column()
  title: string;

  @ApiProperty({description: 'id of user who started discussion'})
  @Column()
  onwer: string;

  @ApiProperty({description: 'text, could be formatted html'})
  @Column()
  description: string;

  @ApiProperty({description: 'topic of discussion'})
  @Column()
  topic: string;

  @ApiProperty({description: 'sub topic of discussion'})
  @Column()
  subtopic: string;

  @ApiProperty({description: 'Associated Media with discussion'})
  @Column()
  media: string [];

  @ApiProperty({description: 'replies of discussion'})
  @Column(type => DiscussionReply)
  replies: DiscussionReply [];
}
