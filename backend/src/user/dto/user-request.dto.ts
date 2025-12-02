import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class UserRequestDto {
  @IsEmail({}, { message: 'Email không hợp lệ' }) // Kiểm tra format email
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }) // Rule thêm cho an toàn
  @Matches(/^(?=.*[0-9])/, {
    message: 'Mật khẩu phải có ít nhất 1 số',
  })
  password: string;
}
