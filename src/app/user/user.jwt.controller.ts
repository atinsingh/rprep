import { Body, Controller, Logger, Post, Res, Req, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserLoginDTO } from '../../services/dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {AuthResponseDto} from "../../model/dto/auth.response.dto";

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('Auth')
export class UserJWTController {
  logger = new Logger('UserJWTController');

  constructor(private readonly authService: AuthService) {}

  @Post('/authenticate')
  //@AP({ {title}: 'Authorization api retrieving token' })
  @ApiResponse({
      status: 201,
      description: 'Authorized',
      type: AuthResponseDto
  })
  async authorize(@Req() req: Request, @Body() user: UserLoginDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.login(user);
    let data: AuthResponseDto;
    if(jwt!=null){
        // eslint-disable-next-line @typescript-eslint/camelcase
        data = {code: "200", id_token: jwt.id_token};
    }
    res.setHeader('Authorization', 'Bearer ' + jwt.id_token);
    return res.json(data);
  }
}
