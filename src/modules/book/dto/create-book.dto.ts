import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {

  @ApiProperty({
    example: "Clean Code",
    description: "Title of the book"
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: "Robert C. Martin",
    description: "Author of the book"
  })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({
    example: "ISBN-001",
    description: "Unique ISBN code"
  })
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @ApiProperty({
    example: 2008,
    description: "Year the book was published"
  })
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publishedYear!: number;
}