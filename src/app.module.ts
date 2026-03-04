import { Module } from '@nestjs/common';
import { BookModule } from './modules/book/book.module';
import { MemberModule } from './modules/member/member.module';
import { BorrowModule } from './modules/borrow/borrow.module';
@Module({
  imports: [BookModule, MemberModule, BorrowModule],
})
export class AppModule {}
