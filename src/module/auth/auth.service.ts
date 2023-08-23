import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(user: CreateUserDto): Promise<any> {
    const isUniqueEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (isUniqueEmail) {
      return false;
    }
    const users = this.userRepository.create(user);
    return await this.userRepository.save(users);
  }

  async login(user: CreateUserDto): Promise<any> {
    const userLogin = await this.userRepository.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });
    if (!userLogin) {
      return false;
    }
    return userLogin;
  }

  async generatedJWT(user: any): Promise<string> {
    return await this.jwtService.sign({ user });
  }
}
