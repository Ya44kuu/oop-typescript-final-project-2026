import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Member } from './member.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Members')


@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() dto: CreateMemberDto): ApiResponse<Member> {
    const member = this.memberService.create(dto);

    return {
      success: true,
      message: 'Member created successfully',
      data: member,
    };
  }

  @Get()
  findAll(): ApiResponse<Member[]> {
    const members = this.memberService.findAll();

    return {
      success: true,
      message: 'Members retrieved successfully',
      data: members,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<Member> {
    const member = this.memberService.findOne(Number(id));

    return {
      success: true,
      message: 'Member retrieved successfully',
      data: member,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMemberDto,
  ): ApiResponse<Member> {
    const member = this.memberService.update(Number(id), dto);

    return {
      success: true,
      message: 'Member updated successfully',
      data: member,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.memberService.remove(Number(id));

    return {
      success: true,
      message: 'Member deleted successfully',
      data: null,
    };
  }
}