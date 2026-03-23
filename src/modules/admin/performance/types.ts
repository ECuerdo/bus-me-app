export interface DriverPerformance {
  id: string;
  name: string;
  score: number;
  trips: number;
  punctuality: string;
  status: 'Elite' | 'Certified' | 'Standard';
  feedback: string;
}

export interface UserFeedback {
  id: string;
  user: string;
  driver: string;
  rating: number;
  comment: string;
  date: string;
}
