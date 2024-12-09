import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsNotEmpty({ message: 'email kh đc để trống' })
  @IsEmail({}, { message: 'email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'password kh đc để trống' })
  password: string;

  phone: string;

  address: string;

  image: string;
}
