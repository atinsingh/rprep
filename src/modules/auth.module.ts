import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../security/passport.jwt.strategy';
import { UserJWTController } from '../controllers/user.jwt.controller';
import { config } from '../app.config';


import { AuthController } from '../controllers/auth.controller';
import { AccountController } from '../controllers/account.controller';

@Module({
  imports: [
    //TypeOrmModule.forFeature([AuthorityRepository]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config['app.security.authentication.jwt.base64-secret'],
      signOptions: { expiresIn: '300s' }
    })
  ],
  controllers: [UserJWTController, AuthController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
