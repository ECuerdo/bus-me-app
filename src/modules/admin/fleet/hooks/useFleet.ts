import { useState, useMemo, useEffect } from "react";
import { Wrench, ShieldCheck, Calendar } from "lucide-react";
import { Bus, MaintenanceLog } from "../types";

export const useFleet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [buses, setBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/buses");
      if (!res.ok) throw new Error("Failed to fetch buses");
      const data = await res.json();
      
      const formattedBuses: Bus[] = data.map((b: any) => ({
        id: b.id.substring(0, 8), 
        plate: b.plate_number,
        type: b.capacity > 40 ? "Executive" : "Regular",
        status: b.status === "in_transit" ? "In Transit" : b.status === "out_of_service" ? "Out of Service" : b.status.charAt(0).toUpperCase() + b.status.slice(1),
        route: "Unassigned", 
        condition: b.last_maintenance_date ? "Fair" : "Excellent", 
        model: b.model,
        capacity: b.capacity
      }));
      setBuses(formattedBuses);
    } catch (err) {
      console.error("Error fetching buses:", err);
    }
    setIsLoading(false);
  };

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
  }, [buses, searchTerm]);

  const stats = [
    { label: "Pending Tasks", val: "12", icon: Wrench, col: "text-amber-500" },
    { label: "Registered Units", val: `${buses.length}`, icon: ShieldCheck, col: "text-emerald-500" },
    { label: "Avg Service Cycle", val: "14 Days", icon: Calendar, col: "text-blue-500" },
  ];

  return {
    searchTerm,
    setSearchTerm,
    filteredBuses,
    maintenanceLogs,
    stats,
    isLoading,
    refreshFleet: fetchBuses
  };
};
