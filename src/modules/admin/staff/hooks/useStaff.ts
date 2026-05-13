import { useState, useMemo, useEffect } from "react";
import { StaffMember } from "../types";

export const useStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/drivers");
      if (!res.ok) throw new Error("Failed to fetch drivers");
      const data = await res.json();
      
      const formattedStaff: StaffMember[] = data.map((d: any) => ({
        id: "DRV-" + d.id.substring(0, 5).toUpperCase(),
        name: `${d.first_name} ${d.last_name}`,
        role: "Driver",
        status: d.status === "on_leave" ? "On-Leave" : d.status.charAt(0).toUpperCase() + d.status.slice(1),
        email: d.license_number, 
        phone: d.contact_number,
        joined: new Date(d.created_at).toISOString().split('T')[0]
      }));
      setStaff(formattedStaff);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
    setIsLoading(false);
  };

  const filteredStaff = useMemo(() => {
    return staff.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, staff]);

  return {
    searchTerm,
    setSearchTerm,
    filteredStaff,
    staff,
    isLoading,
    refreshStaff: fetchStaff
  };
};
