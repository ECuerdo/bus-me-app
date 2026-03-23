import { useState, useMemo } from "react";
import { Wrench, ShieldCheck, Calendar } from "lucide-react";
import { Bus, MaintenanceLog } from "../types";

export const useFleet = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const buses: Bus[] = [
    { id: "B-101", plate: "ABC-1234", type: "Executive", status: "Active", route: "Manila - Baguio", condition: "Excellent", model: "Higer 2023", capacity: 45 },
    { id: "B-102", plate: "XYZ-5678", type: "Regular", status: "Maintenance", route: "Pasay - Legazpi", condition: "Fair", model: "Yutong 2022", capacity: 49 },
    { id: "B-103", plate: "LMN-9012", type: "Sleeper", status: "Active", route: "Manila - Vigan", condition: "Excellent", model: "Volvo B11R", capacity: 32 },
    { id: "B-104", plate: "QWE-3456", type: "Executive", status: "Inactive", route: "None", condition: "Critical", model: "Higer 2021", capacity: 45 },
  ];

  const maintenanceLogs: MaintenanceLog[] = [
    { id: "M-501", plate: "ABC-1234", action: "Change Oil", schedule: "2024-03-25", status: "Pending", cert: "LTO/LTFRB Valid" },
    { id: "M-502", plate: "XYZ-5678", action: "Tire Rotation", schedule: "2024-03-22", status: "Completed", cert: "LTFRB Expired" },
    { id: "M-503", plate: "LMN-9012", action: "Brake Check", schedule: "2024-04-01", status: "Scheduled", cert: "LTO/LTFRB Valid" },
  ];

  const filteredBuses = useMemo(() => {
    return buses.filter(bus => 
      bus.plate.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bus.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const stats = [
    { label: "Pending Tasks", val: "12", icon: Wrench, col: "text-amber-500" },
    { label: "Valid Registrations", val: "42/48", icon: ShieldCheck, col: "text-emerald-500" },
    { label: "Avg Service Cycle", val: "14 Days", icon: Calendar, col: "text-blue-500" },
  ];

  return {
    searchTerm,
    setSearchTerm,
    filteredBuses,
    maintenanceLogs,
    stats
  };
};
