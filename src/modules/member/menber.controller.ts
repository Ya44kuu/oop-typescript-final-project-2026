import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() dto: CreateMemberDto) {
    return this.memberService.create(dto);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.memberService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(Number(id));
  }
}