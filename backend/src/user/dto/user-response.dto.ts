import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose() // Cho phép trả về
  message: string;

  @Expose() // Cho phép trả về
  _id: string;

  @Expose() // Cho phép trả về
  email: string;

  @Expose() // Cho phép trả về
  createdAt: Date;

  // Constructor để dễ tạo instance
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
