export type MemberRole = 'Owner' | 'Admin' | 'Member';

export interface Member {
  id: string;
  user_id: string;
  project_id: string;
  roles: MemberRole[];
  name: string;
  email: string;
  created_at: string;
}
