import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

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
}
