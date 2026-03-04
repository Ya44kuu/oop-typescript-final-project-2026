import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { MembershipType } from '../member.enum';

export class UpdateMemberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(MembershipType)
  membershipType?: MembershipType;
}