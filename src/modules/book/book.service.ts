import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.interface';
import { BookStatus } from './book.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  // จำลอง Database ด้วย Array
  private books: Book[] = [];

  // ดึงหนังสือทั้งหมด
  findAll(): Book[] {
    return this.books;
  }

  // ค้นหาหนังสือตาม ID
  findOne(id: string): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`ไม่พบหนังสือรหัส ${id}`);
    }
    return book;
  }

  // เพิ่มหนังสือใหม่
  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: Date.now().toString(), // สร้าง ID แบบง่ายๆ ด้วยเวลา
      ...createBookDto,
      status: BookStatus.AVAILABLE, // ค่าเริ่มต้นคือ ว่าง
    };
    this.books.push(newBook);
    return newBook;
  }

  // แก้ไขข้อมูลหนังสือ
  update(id: string, updateBookDto: UpdateBookDto): Book {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`ไม่พบหนังสือรหัส ${id}`);
    }

    const updatedBook = {
      ...this.books[bookIndex],
      ...updateBookDto,
    };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  // ลบหนังสือ
  remove(id: string): void {
    const bookIndex = this.books.findIndex((b) => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`ไม่พบหนังสือรหัส ${id}`);
    }
    this.books.splice(bookIndex, 1);
  }
}