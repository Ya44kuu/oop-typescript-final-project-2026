import { MembershipType } from '../member.enum';

export class UpdateMemberDto {
  name?: string;
  email?: string;
  membershipType?: MembershipType;
}