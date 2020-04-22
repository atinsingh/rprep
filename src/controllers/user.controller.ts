import { UserService } from '../services/user.service';
import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { LoggingInterceptor } from '../client/interceptors/logging.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../security';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService:UserService){

  }

  @Get()
  getUser(): Promise<User[]> {
   // const  user= new User();
    return this.userService.findAll()
  }
  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

}
