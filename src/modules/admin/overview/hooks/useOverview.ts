import { 
  Activity, 
  Clock, 
  ShieldCheck, 
  Bus 
} from "lucide-react";
import { DashboardStat, BusTelemetry, PassengerDensity } from "../types";

export const useOverview = () => {
  const stats: DashboardStat[] = [
    { label: "On Travel", value: "18 Units", change: "Active Now", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10", glow: "shadow-emerald-500/20" },
    { label: "Delayed", value: "3 Units", change: "Alert", icon: Clock, iconColor: "text-rose-500", color: "text-rose-500", bg: "bg-rose-500/10", glow: "shadow-rose-500/20" },
    { label: "Arrived Today", value: "24 Units", change: "Completed", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-500/10", glow: "shadow-blue-500/20" },
    { label: "Maintenance", value: "3 Units", change: "Workshops", icon: Bus, color: "text-amber-500", bg: "bg-amber-500/10", glow: "shadow-amber-500/20" },
  ];

  const telemetry: BusTelemetry[] = [
    { id: "B-101", position: [14.5995, 120.9842], name: "Manila Terminal", status: 'active' },
    { id: "B-102", position: [14.5547, 121.0244], name: "Makati Central", status: 'active' },
    { id: "B-103", position: [14.6760, 121.0437], name: "Quezon City Hub", status: 'active' },
    { id: "B-104", position: [14.5378, 121.0014], name: "Pasay Station", status: 'active' },
  ];

  const occupancy: PassengerDensity[] = [
    { bus: "B-201", occupancy: 42, capacity: 45, route: "MNL-BGIO", status: "Critical" },
    { bus: "B-155", occupancy: 12, capacity: 45, route: "DVO-CEB", status: "Low" },
    { bus: "B-402", occupancy: 35, capacity: 45, route: "ILO-BAC", status: "Optimal" },
  ];

  return {
    stats,
    telemetry,
    occupancy,
    revenue: 842100
  };
};
