import { useState } from "react";
import { Activity, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { TransitSchedule, TransitRoute, ScheduleStat } from "../types";

export const useSchedules = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const schedules: TransitSchedule[] = [
    { id: "TRP-001", bus: "B-201", route: "Manila - Baguio", departure: "08:30 AM", arrival: "02:30 PM", status: "On Travel", occupancy: "42/45", driver: "Juan Dela Cruz" },
    { id: "TRP-002", bus: "B-155", route: "Davao - Cebu", departure: "10:00 AM", arrival: "06:00 PM", status: "Delayed", occupancy: "12/45", driver: "Maria Santos" },
    { id: "TRP-003", bus: "B-402", route: "Iloilo - Bacolod", departure: "01:15 PM", arrival: "03:45 PM", status: "Arrived", occupancy: "35/45", driver: "Pedro Penduko" },
  ];

  const routes: TransitRoute[] = [
    { name: "Arterial Alpha", origin: "Manila", destination: "Baguio", stops: 4, distance: "246km", fare: "₱750" },
    { name: "Coastal Beta", origin: "Davao", destination: "Cebu", stops: 2, distance: "820km", fare: "₱1,200" },
    { name: "Island Gamma", origin: "Iloilo", destination: "Bacolod", stops: 1, distance: "45km", fare: "₱250" },
  ];

  const stats: ScheduleStat[] = [
    { label: "On Road", val: "18", icon: Activity, col: "text-emerald-500" },
    { label: "Pending", val: "42", icon: Clock, col: "text-amber-500" },
    { label: "Delayed", val: "03", icon: AlertTriangle, col: "text-rose-500" },
    { label: "Completed", val: "24", icon: ShieldCheck, col: "text-blue-500" },
  ];

  return {
    searchTerm,
    setSearchTerm,
    schedules,
    routes,
    stats
  };
};
