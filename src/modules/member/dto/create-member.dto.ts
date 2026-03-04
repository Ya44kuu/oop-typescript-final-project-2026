import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MembershipType } from '../member.enum';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsEnum(MembershipType)
  membershipType!: MembershipType;
}