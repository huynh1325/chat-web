import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "username kh đc để trống"})
    username: string;
    
    @IsNotEmpty({ message: "password kh đc để trống"})
    password: string;
}