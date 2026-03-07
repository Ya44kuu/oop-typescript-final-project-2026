import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {

  @ApiProperty({
    example: 1,
    description: "Book ID to borrow"
  })
  @IsInt()
  @Min(1)
  bookId!: number;

  @ApiProperty({
    example: 2,
    description: "Member ID who borrows the book"
  })
  @IsInt()
  @Min(1)
  memberId!: number;

}