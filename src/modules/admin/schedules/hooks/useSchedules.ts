import { useState, useMemo, useEffect } from "react";
import { Activity, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { TransitSchedule, TransitRoute, ScheduleStat } from "../types";

export const useSchedules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schedules, setSchedules] = useState<TransitSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/schedules");
      if (!res.ok) throw new Error("Failed to fetch schedules");
      const data = await res.json();

      const formatted: TransitSchedule[] = data.map((s: any) => ({
        id: "TRP-" + s.id.substring(0, 5).toUpperCase(),
        bus: s.buses?.plate_number || "Unassigned",
        route: s.routes?.name || "Unassigned",
        departure: new Date(s.departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        arrival: new Date(s.estimated_arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: s.status.charAt(0).toUpperCase() + s.status.slice(1).replace("_", " "),
        occupancy: `0/${s.buses?.capacity || 45}`, 
        driver: s.drivers ? `${s.drivers.first_name} ${s.drivers.last_name}` : "Unassigned"
      }));
      setSchedules(formatted);
    } catch(err) {
      console.error("Error fetching schedules:", err);
    }
    setIsLoading(false);
  };

  const routes: TransitRoute[] = [];

  const stats: ScheduleStat[] = [
    { label: "Total Missions", val: `${schedules.length}`, icon: Activity, col: "text-emerald-500" },
    { label: "Pending", val: `${schedules.filter(s => s.status === 'Scheduled').length}`, icon: Clock, col: "text-amber-500" },
    { label: "Delayed", val: `${schedules.filter(s => s.status === 'Delayed').length}`, icon: AlertTriangle, col: "text-rose-500" },
    { label: "Completed", val: `${schedules.filter(s => s.status === 'Completed').length}`, icon: ShieldCheck, col: "text-blue-500" },
  ];

  return {
    searchTerm,
    setSearchTerm,
    schedules,
    routes,
    stats,
    isLoading,
    refreshSchedules: fetchSchedules
  };
};
