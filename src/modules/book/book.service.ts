import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { FileStorage } from '../../common/utils/file-storage';
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookStatus } from './book.enum';

@Injectable()
export class BookService {
  private fileName = 'books.json';

  findAll(): Book[] {
    return FileStorage.readFile<Book>(this.fileName) || [];
  }

  findOne(id: number): Book {
    const books = this.findAll();
    const book = books.find((b) => b.id === id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  create(data: CreateBookDto): Book {
    const books = this.findAll();
    
    const existingBook = books.find((b) => b.isbn === data.isbn);
    if (existingBook) {
      throw new ConflictException(`Book with ISBN ${data.isbn} already exists`);
    }

    const newBook: Book = {
      id: Date.now(),
      status: BookStatus.AVAILABLE,
      ...data,
    };

    books.push(newBook);
    FileStorage.writeFile(this.fileName, books);

    return newBook;
  }

  update(id: number, data: UpdateBookDto): Book {
    const books = this.findAll();
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (data.isbn) {
      const duplicateIsbn = books.find((b) => b.isbn === data.isbn && b.id !== id);
      if (duplicateIsbn) {
        throw new ConflictException(`Book with ISBN ${data.isbn} already exists`);
      }
    }

    books[index] = { ...books[index], ...data };
    FileStorage.writeFile(this.fileName, books);

    return books[index];
  }

  remove(id: number): void {
    const books = this.findAll();
    const filtered = books.filter((b) => b.id !== id);

    if (books.length === filtered.length) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    FileStorage.writeFile(this.fileName, filtered);
  }
}