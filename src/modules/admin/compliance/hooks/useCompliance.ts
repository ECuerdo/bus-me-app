import { useMemo } from "react";
import { ShieldCheck, ShieldAlert, History } from "lucide-react";
import { ComplianceRecord, IncidentLog, ComplianceStat } from "../types";

export const useCompliance = () => {
  const complianceData: ComplianceRecord[] = [
    { item: "LTO Registration", unit: "B-201", expiry: "2024-12-15", status: "Valid", authority: "LTO NCR" },
    { item: "LTFRB Franchise", unit: "B-155", expiry: "2025-03-20", status: "Valid", authority: "LTFRB" },
    { item: "Comprehensive Insurance", unit: "B-402", expiry: "2024-05-10", status: "Expiring", authority: "Pioneer" },
    { item: "Emission Testing", unit: "B-102", expiry: "2024-01-30", status: "Expired", authority: "VICO" },
  ];

  const incidentLogs: IncidentLog[] = [
    { id: "INC-901", type: "Minor Mechanical", unit: "B-205", severity: "Low", date: "2024-03-18", resolution: "Resolved" },
    { id: "INC-902", type: "Schedule Deviation", unit: "B-112", severity: "Medium", date: "2024-03-19", resolution: "Pending" },
  ];

  const stats: ComplianceStat[] = [
    { label: "Fleet Integrity", val: "94.2%", icon: ShieldCheck, col: "text-emerald-500" },
    { label: "Active Alerts", val: "02", icon: ShieldAlert, col: "text-rose-500" },
    { label: "Pending Renewals", val: "12", icon: History, col: "text-amber-500" },
  ];

  return {
    complianceData,
    incidentLogs,
    stats
  };
};
