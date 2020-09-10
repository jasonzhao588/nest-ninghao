import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<any> {
    const { username, password } = data;
    const entity = await this.userService.findByName(username);
    if (!entity) {
      throw new UnauthorizedException('用户名不存在');
    }
    if (!(await entity.comparePassword(password))) {
      throw new UnauthorizedException('密码错误');
    }
    const { id } = entity;
    const payload = { id, username };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };
  }

  signToken(data: JwtPayload): string {
    return this.jwtService.sign(data);
  }
}
