import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants/jsw.secret';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '7d', //设置签发jwt的有效时间
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
