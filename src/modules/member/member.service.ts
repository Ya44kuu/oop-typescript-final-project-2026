import { Injectable } from '@nestjs/common';
import { Member } from './member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  private members: Member[] = [];
  private idCounter = 1;

  create(dto: CreateMemberDto): Member {
    const newMember: Member = {
      id: this.idCounter++,
      name: dto.name,
      email: dto.email,
      membershipType: dto.membershipType,
    };

    this.members.push(newMember);
    return newMember;
  }

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member | undefined {
    return this.members.find(m => m.id === id);
  }

  update(id: number, dto: UpdateMemberDto): Member | undefined {
    const member = this.findOne(id);
    if (!member) return undefined;

    if (dto.name) member.name = dto.name;
    if (dto.email) member.email = dto.email;
    if (dto.membershipType) member.membershipType = dto.membershipType;

    return member;
  }

  remove(id: number): string {
    this.members = this.members.filter(m => m.id !== id);
    return 'deleted';
  }
}