import { Injectable } from '@nestjs/common';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  private members: Member[] = [];
  private idCounter = 1;

  create(dto: CreateMemberDto) {
    const member: Member = {
      id: this.idCounter++,
      name: dto.name,
      email: dto.email,
    };

    this.members.push(member);
    return member;
  }

  findAll() {
    return this.members;
  }

  findOne(id: number) {
    return this.members.find(m => m.id === id);
  }

  update(id: number, dto: UpdateMemberDto) {
    const member = this.findOne(id);
    if (!member) return null;

    if (dto.name) member.name = dto.name;
    if (dto.email) member.email = dto.email;

    return member;
  }

  remove(id: number) {
    this.members = this.members.filter(m => m.id !== id);
    return { message: 'deleted' };
  }
}