import { useState, useMemo } from "react";
import { StaffMember } from "../types";

export const useStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const staff: StaffMember[] = [
    { id: "S-001", name: "Roberto Cruz", role: "Driver", status: "Active", email: "roberto.c@busme.pro", phone: "+63 912 345 6789", joined: "2023-05-15" },
    { id: "S-002", name: "Antonio Luna", role: "Driver", status: "Active", email: "antonio.l@busme.pro", phone: "+63 912 345 6788", joined: "2023-06-10" },
    { id: "S-003", name: "Maria Clara", role: "Conductor", status: "Active", email: "maria.c@busme.pro", phone: "+63 912 345 6787", joined: "2023-07-01" },
    { id: "S-004", name: "Juan Dela Cruz", role: "Driver", status: "On-Leave", email: "juan.d@busme.pro", phone: "+63 912 345 6786", joined: "2022-11-20" },
    { id: "S-005", name: "Miguel Lopez", role: "Maintenance", status: "Active", email: "miguel.l@busme.pro", phone: "+63 912 345 6785", joined: "2024-01-05" },
  ];

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
    staff
  };
};
