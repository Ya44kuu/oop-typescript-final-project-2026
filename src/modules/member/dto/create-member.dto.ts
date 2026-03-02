import { MembershipType } from '../member.enum';

export class CreateMemberDto {
  name!: string;
  email!: string;
  membershipType!: MembershipType;
}