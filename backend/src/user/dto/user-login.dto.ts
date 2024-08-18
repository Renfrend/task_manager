import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly password: string;
}
