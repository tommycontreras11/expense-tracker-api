import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: "The max length is 100" })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100, { message: "The max length is 255" })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: "The max length is 255" })
  password: string;
}
