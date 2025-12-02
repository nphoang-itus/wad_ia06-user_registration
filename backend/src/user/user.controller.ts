import {
  Controller,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/user-request.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    this.logger.log(
      `POST /user/register - Received registration request for email: ${dto.email}`,
    );
    try {
      const user: UserResponseDto = await this.userService.create(dto);
      this.logger.log(
        `POST /user/register - Registration successful for email: ${dto.email}`,
      );
      return user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `POST /user/register - Registration failed for email: ${dto.email} - ${errorMessage}`,
      );
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: UserRequestDto) {
    this.logger.log(
      `POST /user/login - Received login request for email: ${dto.email}`,
    );
    try {
      const user = await this.userService.login(dto);
      this.logger.log(
        `POST /user/login - Login successful for email: ${dto.email}`,
      );
      return {
        message: 'Đăng nhập thành công',
        user,
      };
    } catch (error) {
      this.logger.error(
        `POST /user/login - Login failed for email: ${dto.email} - ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
      throw error;
    }
  }
}
