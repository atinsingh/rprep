import { SearchService } from './search.service';
import {
  Controller,
  Get,
  Logger,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseInfo } from '../../model/courseinfo.entity';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../../security';

@Controller('api/search')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiTags('Search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/:keyword')
  getSearchResult(
    @Request() req,
    @Param() param,
  ): Promise<CourseInfo | undefined> {
    Logger.debug(`Received request for the course search ${param.keyword} `);
    return this.searchService.search(param.keyword);
  }
}
