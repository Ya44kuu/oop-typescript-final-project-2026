export interface BorrowRecord {
  id: number;
  bookId: number;
  memberId: number;
  borrowedAt: Date;
  returnedAt: Date | null;
}