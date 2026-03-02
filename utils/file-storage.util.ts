

export enum MembershipType {
  REGULAR = 'REGULAR',
  PREMIUM = 'PREMIUM'
}

export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  LOST = 'LOST'
}

export class Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;

  constructor(
    id: number, 
    title: string, 
    author: string, 
    isbn: string, 
    status: BookStatus = BookStatus.AVAILABLE
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = status;
  }

  markAsBorrowed(): void {
    this.status = BookStatus.BORROWED;
  }

  markAsAvailable(): void {
    this.status = BookStatus.AVAILABLE;
  }
}

export class BorrowRecord {
  id: number;
  borrowedAt: Date;
  returnedAt: Date | null;
  
  member: Member;
  book: Book;

  constructor(id: number, member: Member, book: Book) {
    this.id = id;
    this.borrowedAt = new Date(); 
    this.returnedAt = null; 
    this.member = member;
    this.book = book;
  }
}

export class Member {
  id: number;
  name: string;
  email: string;
  membershipType: MembershipType;
  borrowRecords: BorrowRecord[] = [];

  constructor(id: number, name: string, email: string, membershipType: MembershipType) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.membershipType = membershipType;
  }

  borrow(book: Book): BorrowRecord {
    if (book.status !== BookStatus.AVAILABLE) {
      throw new Error(`หนังสือ ${book.title} ไม่พร้อมให้ยืมในขณะนี้`);
    }
    book.markAsBorrowed();
    const recordId = Date.now(); 
    const record = new BorrowRecord(recordId, this, book);
    this.borrowRecords.push(record);

    return record;
  }
  returnBook(book: Book): void {
    const record = this.borrowRecords.find(
      (r) => r.book.id === book.id && r.returnedAt === null
    );

    if (record) {
      record.returnedAt = new Date();
      book.markAsAvailable();
    } else {
      throw new Error('ไม่พบประวัติการยืม หรือหนังสือเล่มนี้ถูกคืนไปแล้ว');
    }
  }
}

import * as fs from 'fs';
import * as path from 'path';

export class FileStorageUtil {
  static readData<T>(fileName: string): T[] {
    const filePath = path.resolve(__dirname, `../../../data/${fileName}`);
    
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T[];
  }

  static writeData<T>(fileName: string, data: T[]): void {
    const dirPath = path.resolve(__dirname, '../../../data');
    const filePath = path.join(dirPath, fileName);
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}


