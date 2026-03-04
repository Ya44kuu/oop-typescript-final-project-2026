import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileStorage } from '../../common/utils/file-storage';
import { Member } from './member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  private fileName = 'members.json';

  findAll(): Member[] {
    return FileStorage.readFile<Member>(this.fileName);
  }

  findOne(id: number): Member {
    const members = this.findAll();
    const member = members.find((m) => m.id === id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  create(dto: CreateMemberDto): Member {
    const members = this.findAll();

    const emailExists = members.some((m) => m.email === dto.email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const newMember: Member = {
      id: Date.now(),
      ...dto,
    };

    members.push(newMember);
    FileStorage.writeFile(this.fileName, members);

    return newMember;
  }

  update(id: number, dto: UpdateMemberDto): Member {
    const members = this.findAll();
    const index = members.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundException('Member not found');
    }

    if (dto.email) {
      const emailExists = members.some(
        (m) => m.email === dto.email && m.id !== id,
      );

      if (emailExists) {
        throw new BadRequestException('Email already exists');
      }
    }

    members[index] = {
      ...members[index],
      ...dto,
    };

    FileStorage.writeFile(this.fileName, members);

    return members[index];
  }

  remove(id: number): void {
    const members = this.findAll();
    const member = members.find((m) => m.id === id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const filtered = members.filter((m) => m.id !== id);
    FileStorage.writeFile(this.fileName, filtered);
  }
}