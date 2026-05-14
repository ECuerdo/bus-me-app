import { useState, useMemo, useEffect } from "react";
import { StaffMember } from "../types";
import { staffProvider } from "../fetchProviders/staffProvider";

export const useStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const formattedStaff = await staffProvider.getStaff();
      setStaff(formattedStaff);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await fetchStaff();
    };
    init();
  }, []);

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
