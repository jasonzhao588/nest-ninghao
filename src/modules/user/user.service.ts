/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async store(data: UserDto) {
    const { username } = data;
    const user = await this.userRepository.findOne({ username });

    if (user) {
      throw new BadRequestException('用户已经存在');
    }

    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }

  async show(id: string) {
    const entity = await this.userRepository.findOne(id);

    if (!entity) {
      throw new NotFoundException('没有找到用户');
    }

    return entity;
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { password, newPassword } = data;
    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有你找的用户');
    }

    const pass = await entity.comparePassword(password);
    console.log(password);

    if (!pass) {
      throw new BadRequestException('密码验证失败，请输入正确密码');
    }

    entity.password = newPassword;
    return await this.userRepository.save(entity);
  }

  async findByName(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }
}
