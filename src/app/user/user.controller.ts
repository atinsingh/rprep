import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '../../model/user.entity';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../../security';

@Controller('api/user')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService:UserService){

  }

  @Get()
  @ApiResponse({
    type : User,
    status: 200
  })
  async getUser(): Promise<User[]> {
   // const  user= new User();
    return await this.userService.findAll()
  }
  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

}
