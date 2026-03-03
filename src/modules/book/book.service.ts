import { Injectable, NotFoundException } from '@nestjs/common';
import { FileStorage } from '../../common/utils/file-storage';
import { Book } from './book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { BookStatus } from './book.enum';

@Injectable()
export class BookService {

  private fileName = 'books.json';

  findAll(): Book[] {
    return FileStorage.readFile<Book>(this.fileName);
  }

  findOne(id: number): Book {
    const books = this.findAll();
    const book = books.find(b => b.id === id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  create(data: CreateBookDto): Book {
    const books = this.findAll();

    const newBook: Book = {
      id: Date.now(),
      status: BookStatus.AVAILABLE,
      ...data,
    };

    books.push(newBook);
    FileStorage.writeFile(this.fileName, books);

    return newBook;
  }

  update(id: number, data: Partial<Book>): Book {
    const books = this.findAll();
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
      throw new NotFoundException('Book not found');
    }

    books[index] = { ...books[index], ...data };
    FileStorage.writeFile(this.fileName, books);

    return books[index];
  }

  remove(id: number): void {
    const books = this.findAll();
    const filtered = books.filter(b => b.id !== id);

    if (books.length === filtered.length) {
      throw new NotFoundException('Book not found');
    }

    FileStorage.writeFile(this.fileName, filtered);
  }
}