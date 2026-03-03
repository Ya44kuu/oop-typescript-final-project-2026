import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Controller('borrows')
export class BorrowController {

  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateBorrowDto) {
    return this.borrowService.create(dto);
  }

  @Patch(':id/return')
  returnBook(@Param('id') id: string) {
    return this.borrowService.returnBook(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowService.remove(Number(id));
  }
}