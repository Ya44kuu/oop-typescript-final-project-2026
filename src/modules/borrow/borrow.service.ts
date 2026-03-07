import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileStorage } from '../../common/utils/file-storage';
import { BorrowRecord } from './borrow.interface';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowService {

  private fileName = 'borrows.json';

  findAll(): BorrowRecord[] {
    return FileStorage.readFile<BorrowRecord>(this.fileName);
  }

  findOne(id: number): BorrowRecord {
    const borrows = this.findAll();
    const borrow = borrows.find(b => b.id === id);

    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }

    return borrow;
  }

  create(data: CreateBorrowDto): BorrowRecord {
    const borrows = this.findAll();

    // Business logic 
    if (!data.bookId || !data.memberId) {
      throw new BadRequestException('Book ID and Member ID are required');
    }

    const newBorrow: BorrowRecord = {
      id: Date.now(),
      borrowedAt: new Date(),
      returnedAt: null,
      ...data,
    };

    borrows.push(newBorrow);
    FileStorage.writeFile(this.fileName, borrows);

    return newBorrow;
  }

  returnBook(id: number): BorrowRecord {

    const borrows = this.findAll();
    const borrow = borrows.find(b => b.id === id);

    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }

    if (borrow.returnedAt !== null) {
      throw new BadRequestException('Book has already been returned');
    }

    borrow.returnedAt = new Date();

    FileStorage.writeFile(this.fileName, borrows);

    return borrow;
  }

  remove(id: number): void {

    const borrows = this.findAll();
    const borrow = borrows.find(b => b.id === id);

    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }

    const filtered = borrows.filter(b => b.id !== id);

    FileStorage.writeFile(this.fileName, filtered);
  }
}