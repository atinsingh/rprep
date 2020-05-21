import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { LangaugeEnum } from './enums/langauge.enum';
import { SkillLevelEnum } from './enums/skill.level.enum';

export class Stats {

    @ApiProperty({description:'Student enrollled in the program'})
    @Column()
    enrolledStudent: number;

    @ApiProperty({description: 'Total Modules'})
    @Column()
    totalModules: number;

    @ApiProperty({description: 'Total Hours'})
    @Column()
    totalHours: number;

    @ApiProperty({description: 'Total Lessons'})
    @Column()
    totalLessons: number;

    @ApiProperty({description: 'Total Language of Course', enum:LangaugeEnum})
    @Column()
    language: LangaugeEnum;

    @ApiProperty({description: 'Required Skill level', enum : SkillLevelEnum})
    @Column()
    skillLevel: SkillLevelEnum;

}
