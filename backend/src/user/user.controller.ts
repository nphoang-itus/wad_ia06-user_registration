import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './entities/user.entity';
import { UserRequestDto } from './dto/user-request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() dto: UserRequestDto) {
    const user: UserDocument = await this.userService.create(dto);

    return {
      message: 'Đăng ký thành công',
      user: {
        email: user.email,
        _id: user._id,
        createdAt: user.createdAt,
      },
    };
  }

  @Post('login')
  async login(@Body() dto: UserRequestDto) {
    const user = await this.userService.login(dto);
    return {
      message: 'Đăng nhập thành công',
      user,
    };
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
