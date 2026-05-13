import type { ElementType } from "react";

export interface ComplianceRecord {
  item: string;
  unit: string;
  expiry: string;
  status: 'Valid' | 'Expiring' | 'Expired';
  authority: string;
}

export interface IncidentLog {
  id: string;
  type: string;
  unit: string;
  severity: 'Low' | 'Medium' | 'High';
  date: string;
  resolution: string;
}

export interface ComplianceStat {
  label: string;
  val: string;
  icon: ElementType;
  col: string;
}
