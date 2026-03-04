import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publishedYear!: number;
}