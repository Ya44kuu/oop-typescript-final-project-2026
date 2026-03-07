import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {

  @ApiPropertyOptional({ example: "Clean Code" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: "Robert C. Martin" })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ example: "ISBN-001" })
  @IsOptional()
  @IsString()
  isbn?: string;

  @ApiPropertyOptional({ example: 2008 })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publishedYear?: number;

}