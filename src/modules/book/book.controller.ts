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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Books')

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): ApiResponse<Book> {
    const newBook = this.bookService.create(createBookDto);
    return {
      success: true,
      message: 'Book created successfully',
      data: newBook,
    };
  }

  @Get()
  findAll(): ApiResponse<Book[]> {
    const books = this.bookService.findAll();
    return {
      success: true,
      message: 'Retrieved all books successfully',
      data: books,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Book> {
    const book = this.bookService.findOne(Number(id));
    return {
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): ApiResponse<Book> {
    const updatedBook = this.bookService.update(Number(id), updateBookDto);
    return {
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.bookService.remove(Number(id));
    return {
      success: true,
      message: 'Book deleted successfully',
      data: null,
    };
  }
}