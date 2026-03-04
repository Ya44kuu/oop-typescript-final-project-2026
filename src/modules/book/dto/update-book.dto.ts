import { IsString, IsOptional, IsInt, Min, Max, IsEnum } from 'class-validator';
import { BookStatus } from '../book.enum';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsEnum(BookStatus)
  @IsOptional()
  status?: BookStatus;

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  @IsOptional()
  publishedYear?: number;
}