import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "email kh đc để trống"})
    email: string;

    @IsNotEmpty({ message: "password kh đc để trống"})
    password: string;

    @IsOptional()
    name: string;
}