import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../auth.interface';
import { jwtConstants } from '../constants/jsw.secret';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('payload', payload);
    const { username } = payload;
    const entity = await this.userService.findByName(username);
    if (!entity) {
      throw new UnauthorizedException('没找到用户');
    }
    return entity;
  }
}
