import type { ElementType } from "react";

export interface Bus {
  id: string;
  plate: string;
  type: string;
  status: string;
  route: string;
  condition: string;
  model: string;
  capacity: number;
}

export interface MaintenanceLog {
  id: string;
  plate: string;
  action: string;
  schedule: string;
  status: string;
  cert: string;
}

export interface FleetStats {
  label: string;
  val: string;
  icon: ElementType;
  col: string;
}
