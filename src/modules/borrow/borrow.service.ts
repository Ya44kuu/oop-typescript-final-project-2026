import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('Borrow not found');
    }

    return borrow;
  }

  create(data: CreateBorrowDto): BorrowRecord {
    const borrows = this.findAll();

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

  update(id: number, data: Partial<BorrowRecord>): BorrowRecord {
    const borrows = this.findAll();
    const index = borrows.findIndex(b => b.id === id);

    if (index === -1) {
      throw new NotFoundException('Borrow not found');
    }

    borrows[index] = { ...borrows[index], ...data };
    FileStorage.writeFile(this.fileName, borrows);

    return borrows[index];
  }

  remove(id: number): void {
    const borrows = this.findAll();
    const filtered = borrows.filter(b => b.id !== id);
    FileStorage.writeFile(this.fileName, filtered);
  }
  
  returnBook(id: number): BorrowRecord {
  const borrows = this.findAll();
  const borrow = borrows.find(b => b.id === id);

  if (!borrow) {
    throw new NotFoundException('Borrow not found');
  }

  borrow.returnedAt = new Date();

  FileStorage.writeFile(this.fileName, borrows);

  return borrow;
  }
}