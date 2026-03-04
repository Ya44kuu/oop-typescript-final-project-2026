import { Injectable, NotFoundException } from '@nestjs/common';
import { FileStorage } from '../../common/utils/file-storage';
import { Member } from './member.interface';

@Injectable()
export class MemberService {

  private fileName = 'members.json';

  findAll(): Member[] {
    return FileStorage.readFile<Member>(this.fileName);
  }

  findOne(id: number): Member {
    const members = this.findAll();
    const member = members.find(m => m.id === id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  create(data: Omit<Member, 'id'>): Member {
    const members = this.findAll();

    const newMember: Member = {
      id: Date.now(),
      ...data,
    };

    members.push(newMember);
    FileStorage.writeFile(this.fileName, members);

    return newMember;
  }

  update(id: number, data: Partial<Member>): Member {
    const members = this.findAll();
    const index = members.findIndex(m => m.id === id);

    if (index === -1) {
      throw new NotFoundException('Member not found');
    }

    members[index] = { ...members[index], ...data };
    FileStorage.writeFile(this.fileName, members);

    return members[index];
  }

  remove(id: number): void {
    const members = this.findAll();
    const filtered = members.filter(m => m.id !== id);
    FileStorage.writeFile(this.fileName, filtered);
  }
}