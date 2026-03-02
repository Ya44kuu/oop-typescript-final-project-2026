import { MembershipType } from './member.enum';

export interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: MembershipType;
}