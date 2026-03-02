import { BookStatus } from '../book.enum';

export class UpdateBookDto {
  title?: string;
  author?: string;
  isbn?: string;
  status?: BookStatus;
  publishedYear?: number;
}