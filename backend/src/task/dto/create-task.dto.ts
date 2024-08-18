import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 128)
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  readonly status: string;

  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}
