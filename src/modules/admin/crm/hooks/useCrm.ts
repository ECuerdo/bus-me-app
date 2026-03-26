import { useState, useEffect } from "react";

export interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  rating: number;
  rides: number;
}

export const useCrm = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/passengers");
      if (!res.ok) throw new Error("Failed to fetch passengers");
      const data = await res.json();

      const formatted: Passenger[] = data.map((p: any) => ({
        id: p.pnr_code || "PNR-" + p.id.substring(0,4).toUpperCase(),
        name: `${p.first_name} ${p.last_name}`,
        email: p.email || "No Email",
        phone: p.phone || "No Phone",
        status: p.loyalty_status,
        rating: Number(p.rating),
        rides: p.total_rides
      }));
      setPassengers(formatted);
    } catch(err) {
      console.error("Error fetching passengers:", err);
    }
    setIsLoading(false);
  };

  return {
    passengers,
    isLoading,
    refreshPassengers: fetchPassengers
  };
};
