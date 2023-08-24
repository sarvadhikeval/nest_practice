import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/module/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RolesGuard } from '../../core/guard/roles.guard';
import { Roles } from '../../core/guard/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authServices: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  @Get()
  async findOne(@Req() req: Request) {
    const {
      user: { id },
    } = req.user as any;
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('img')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({}),
    }),
  )
  img(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log(data);
  }
}
