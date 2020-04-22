import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import { User } from '../domain/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {

    const loginUserName = userLogin.username;
    const loginPassword = userLogin.password;

    const userFind = await this.userService.findByfields( {where: { login: loginUserName, password: loginPassword  }});
    if (!userFind) {
      throw new HttpException('Invalid login name or password.', HttpStatus.BAD_REQUEST);
    }

    const user = await this.findUserWithAuthById(userFind.id);

    const payload: Payload = { id: user.id, username: user.login, authorities: user.authorities };

    /* eslint-disable */
    return {
      id_token: this.jwtService.sign(payload)
    };
  }

  /* eslint-enable */
  async validateUser(payload: Payload): Promise<User | undefined> {
    return await this.findUserWithAuthById(payload.id);
  }

  // async find(): Promise<Authority[]> {
  //   return await this.authorityRepository.find();
  // }

  async findUserWithAuthById(userId: string): Promise<User | undefined> {
    return  await this.userService.findByfields({ where: { id: userId } });
  }
}
