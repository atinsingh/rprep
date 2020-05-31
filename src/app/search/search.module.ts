import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseInfo } from '../../model/courseinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseInfo])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
