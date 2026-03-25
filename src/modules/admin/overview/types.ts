import { LucideIcon } from "lucide-react";

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  glow: string;
  iconColor?: string;
}

export interface BusTelemetry {
  id: string;
  position: [number, number];
  name: string;
  status: 'active' | 'delayed' | 'maintenance';
}

export interface PassengerDensity {
  bus: string;
  occupancy: number;
  capacity: number;
  route: string;
  status: 'Critical' | 'Optimal' | 'Low';
}
