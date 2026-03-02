import { BookStatus } from './book.enum';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: BookStatus;
  publishedYear: number;
}