import { IsNotEmpty, IsInt, IsString, Length } from 'class-validator';

export class ReorderTaskItemDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  status: string;
}
