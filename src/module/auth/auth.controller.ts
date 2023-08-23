import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '../user/entities/joi-validation.pipe';
import { UserEntityValidation } from '../user/entities/user.entity.validation';

@Controller()
export class AuthController {
  constructor(private authServices: AuthService) {}
  @Post('register')
  @UsePipes(new JoiValidationPipe(UserEntityValidation))
  async register(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.authServices.create(createUserDto);
    console.log(createUser);
    if (!createUser) {
      throw new BadRequestException();
    }
    return createUser;
  }

  @Post('login')
  async login(@Body() loginUserDto: CreateUserDto) {
    const userLogin = await this.authServices.login(loginUserDto);
    if (!userLogin) {
      throw new BadRequestException();
    }
    const jwt = await this.authServices.generatedJWT({
      email: userLogin.email,
      id: userLogin.id,
      name: userLogin.name,
      role: userLogin.role,
    });
    return { jwt };
  }
}
