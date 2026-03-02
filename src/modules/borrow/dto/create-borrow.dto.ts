import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBorrowDto {

  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;

}