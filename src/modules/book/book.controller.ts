import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.interface';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('books') // กำหนด path หลักเป็น /books
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): ApiResponse<Book> {
    const newBook = this.bookService.create(createBookDto);
    return {
      success: true,
      message: 'เพิ่มหนังสือสำเร็จ',
      data: newBook,
    };
  }

  @Get()
  findAll(): ApiResponse<Book[]> {
    const books = this.bookService.findAll();
    return {
      success: true,
      message: 'ดึงข้อมูลหนังสือทั้งหมดสำเร็จ',
      data: books,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Book> {
    const book = this.bookService.findOne(id);
    return {
      success: true,
      message: 'ค้นหาหนังสือสำเร็จ',
      data: book,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): ApiResponse<Book> {
    const updatedBook = this.bookService.update(id, updateBookDto);
    return {
      success: true,
      message: 'อัปเดตข้อมูลหนังสือสำเร็จ',
      data: updatedBook,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.bookService.remove(id);
    return {
      success: true,
      message: 'ลบหนังสือสำเร็จ',
      data: null,
    };
  }
}