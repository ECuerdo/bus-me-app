export interface PerformanceMetric {
  label: string;
  value: string;
  trend: string;
  status: 'up' | 'down' | 'stable';
}

export interface RevenuePoint {
  day: string;
  value: number;
}

export interface NetworkShare {
  region: string;
  share: number;
  color: string;
}
