import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { BorrowRecord } from './borrow.interface';

@Controller('borrows')
export class BorrowController {

  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  findAll(): ApiResponse<BorrowRecord[]> {

    const borrows = this.borrowService.findAll();

    return {
      success: true,
      message: 'Borrow records retrieved successfully',
      data: borrows
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<BorrowRecord> {

    const borrow = this.borrowService.findOne(Number(id));

    return {
      success: true,
      message: 'Borrow record retrieved successfully',
      data: borrow
    };
  }

  @Post()
  create(@Body() dto: CreateBorrowDto): ApiResponse<BorrowRecord> {

    const borrow = this.borrowService.create(dto);

    return {
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    };
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: string): ApiResponse<BorrowRecord> {

    const borrow = this.borrowService.returnBook(Number(id));

    return {
      success: true,
      message: 'Book returned successfully',
      data: borrow
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {

    this.borrowService.remove(Number(id));

    return {
      success: true,
      message: 'Borrow record deleted successfully',
      data: null
    };
  }
}