export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'On-Leave' | 'Terminated';
  email: string;
  phone: string;
  joined: string;
}
