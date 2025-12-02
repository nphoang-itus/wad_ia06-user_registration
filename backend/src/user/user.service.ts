import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRequestDto } from './dto/user-request.dto';

@Injectable()
export class UserService {
  // Dependency Injection: Tiêm User Model vào Service để thao tác DB
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: UserRequestDto): Promise<UserDocument> {
    const { email, password } = createUserDto;

    // 1. Check email tồn tại
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      // Trả về lỗi 409 Conflict
      throw new ConflictException('Email đã được sử dụng');
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    // 4. Lưu vào database
    try {
      return await newUser.save();
    } catch {
      throw new InternalServerErrorException(`Lỗi khi lưu vào database`);
    }
  }

  async login(dto: UserRequestDto): Promise<UserResponseDto> {
    const { email, password } = dto;

    // 1. Find user by email, đảm bảo kiểu trả về là UserDocument
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new ConflictException('Email hoặc mật khẩu không đúng');
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Email hoặc mật khẩu không đúng');
    }

    return {
      email: user.email,
      _id: user._id.toString(),
      createdAt: user.createdAt,
    };
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
