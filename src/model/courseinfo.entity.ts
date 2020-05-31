import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MetaData } from './metadata.subentity';
import { StatusEnum } from './enums/status.enum';
import { CourseReview } from './course.review.entity';
import { IsString } from 'class-validator';
import { CourseStatusEnum } from './enums/course.status.enum';
import { Stats } from './stats';
import { CourseOverview } from './course.overview';
import { CourseTerms } from './course.terms';
import { CoursePermisssion } from './course.permisssion';

@Entity('course')
export class CourseInfo {
  @ObjectIdColumn()
  @ApiProperty({
    example: '66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff',
    description: 'Entity id',
  })
  id?: string;

  @ApiProperty({ example: 'JAVA-SEL', description: 'Course Code for P&L' })
  @Column({ nullable: false, unique: true })
  courseCode: string;

  @ApiProperty({
    example: '66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff',
    description: 'Entity id',
  })
  @Column({ unique: true })
  uuid: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Java Full stack developer',
  })
  @Column({ nullable: false })
  @Index({ fulltext: true })
  @IsString()
  courseName: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Learn java with experts etc',
  })
  @Column({ nullable: false })
  shortDescription: string;

  @ApiProperty({ description: 'Long description of the course' })
  @Column({ nullable: false })
  description: string;

  @Column(type => MetaData)
  metadata: MetaData;

  @ApiProperty({ description: 'author_id' })
  @Column()
  author: string;

  @ApiProperty({ description: 'url of thumbnail', example: '/java.png' })
  @Column()
  thumbnailUrl: string;

  @ApiProperty({ description: 'Base64 encoded image' })
  imageData: string;

  @ApiProperty({ description: 'id of instructor' })
  @Column()
  instructor: string;

  @ApiProperty({
    enum: ['OFFLINE', 'ONLINE', 'SELFPACED'],
    description: 'delivery mode',
  })
  @Column()
  deliveryMode: string[];

  @ApiProperty({ description: 'ID of company owns the course' })
  @Column()
  companyId: string;

  @ApiProperty({ description: 'Location ids where program is being delivered' })
  @Column()
  deliveryLocation: object[];

  @ApiProperty({
    enum: ['APPROVED', 'SUSPENDED', 'CANCELLED', 'NEW', 'CLOSED', 'OPEN'],
    description: 'Status of program it should follow the workflow',
  })
  @Column()
  status: StatusEnum;
  @ApiProperty({
    description: 'Set to true if program is approved',
  })
  @Column()
  approved: boolean;

  @Column()
  approvedBy: string;

  @Column()
  internalRating: number;

  @Column()
  externalRating: number;

  @ApiProperty({ description: 'Overview of the program' })
  @Column(type => CourseOverview)
  overview: CourseOverview;

  @ApiProperty({ description: 'Review associated with course' })
  @Column(type => CourseReview)
  reviews: CourseReview[];

  @ApiProperty({ description: 'Review associated with course' })
  @Column()
  courseType: CourseStatusEnum[];

  @ApiProperty({ description: 'Category of Course' })
  @Column()
  category: string[];

  @ApiProperty({ description: 'Category of Course' })
  @Column()
  subCategory: string[];

  @ApiProperty({ description: 'Stats of course' })
  @Column(type => Stats)
  stats: Stats;

  // @Column()
  // termId: CourseTerms;

  //prereqPrograms: string[];

  //courseFaq: string
  //the type of page that users will see when they first visit the course -
  defaultView: string;
  permissions: CoursePermisssion[];

  @ApiProperty()
  @Column()
  isPublic: boolean;
}
