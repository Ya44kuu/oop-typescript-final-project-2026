import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { BorrowRecord } from './borrow.interface';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowService {

  private borrows: BorrowRecord[] = [];

  findAll(): BorrowRecord[] {
    return this.borrows;
  }

  findOne(id: number): BorrowRecord {
    const borrow = this.borrows.find(b => b.id === id);
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }
    return borrow;
  }

  create(dto: CreateBorrowDto): BorrowRecord {
    const newBorrow: BorrowRecord = {
      id: Date.now(),
      bookId: dto.bookId,
      memberId: dto.memberId,
      borrowedAt: new Date(),
      returnedAt: null,
    };

    this.borrows.push(newBorrow);
    return newBorrow;
  }

  returnBook(id: number): BorrowRecord {
    const borrow = this.findOne(id);

    if (borrow.returnedAt !== null) {
      throw new BadRequestException('Book already returned');
    }

    borrow.returnedAt = new Date();
    return borrow;
  }

  remove(id: number): void {
    const index = this.borrows.findIndex(b => b.id === id);

    if (index === -1) {
      throw new NotFoundException('Borrow record not found');
    }

    this.borrows.splice(index, 1);
  }
}