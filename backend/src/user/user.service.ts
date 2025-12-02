import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: UserRequestDto): Promise<UserResponseDto> {
    const { email, password } = createUserDto;

    this.logger.log(`Received registration request for email: ${email}`);

    // 1. Check email tồn tại
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`Registration failed: Email already used (${email})`);
      throw new ConflictException('Email đã tồn tại');
    }

    // 2. Hash Password
    this.logger.debug(`Hashing password for email: ${email}`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    // 4. Lưu vào database
    try {
      const savedUser: UserDocument = await newUser.save();
      this.logger.log(
        `User created successfully: ${savedUser.email} (id: ${savedUser._id.toString()})`,
      );
      return this.mapToResponseDto(savedUser);
    } catch (error) {
      this.logger.error(
        `Failed to create user for email: ${email} - ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new InternalServerErrorException('Lỗi server');
    }
  }

  async login(dto: UserRequestDto): Promise<UserResponseDto> {
    const { email, password } = dto;

    this.logger.log(`Received login request for email: ${email}`);

    // 1. Find user by email
    const user: UserDocument | null = await this.userModel
      .findOne({ email })
      .exec();

    if (!user) {
      this.logger.warn(`Login failed: Email not found (${email})`);
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for email: ${email}`);
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    this.logger.log(`Login successful for email: ${email}`);

    return this.mapToResponseDto(user);
  }

  // =========== Helper method ===========
  private mapToResponseDto(user: UserDocument): UserResponseDto {
    return new UserResponseDto({
      _id: user._id.toString(),
      email: user.email,
      createdAt: user.createdAt,
      // password tự động bị loại bỏ nhờ @Exclude()
    });
  }
}
