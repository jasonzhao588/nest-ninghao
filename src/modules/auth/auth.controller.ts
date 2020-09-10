/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Body,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../../core/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() data: LoginDto): Promise<any> {
    return await this.authService.login(data);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  async authTest(@UserDecorator() user): Promise<any> {
    console.log('user:', user);

    return {
      message: 'ok',
    };
  }
}
