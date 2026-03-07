import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MembershipType } from '../member.enum';

export class CreateMemberDto {

  @ApiProperty({
    example: "John Doe"
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: "john@email.com"
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    enum: MembershipType,
    example: MembershipType.REGULAR
  })
  @IsEnum(MembershipType)
  membershipType!: MembershipType;

}