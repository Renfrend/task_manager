import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
