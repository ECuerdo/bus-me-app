import { useState, useEffect } from "react";

export interface Incident {
  id: string;
  route: string;
  delay: string;
  reason: string;
  severity: string;
  status: string;
}

export const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/incidents?status=open");
      if (!res.ok) throw new Error("Failed to fetch incidents");
      const data = await res.json();

      const formatted: Incident[] = data.map((inc: any) => ({
        id: inc.id,
        route: inc.routes?.name || "Unknown Route",
        delay: `${inc.delay_minutes} mins`,
        reason: inc.description,
        severity: inc.severity.charAt(0).toUpperCase() + inc.severity.slice(1),
        status: inc.status
      }));
      setIncidents(formatted);
    } catch(err) {
      console.error("Error fetching incidents:", err);
    }
    setIsLoading(false);
  };

  return {
    incidents,
    isLoading,
    refreshIncidents: fetchIncidents
  };
};
