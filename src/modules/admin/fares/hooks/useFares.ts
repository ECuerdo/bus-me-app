import { useState, useEffect } from "react";

export interface FareRate {
  id: string;
  route: string;
  base: number;
  perKm: number;
  studentDesc: string;
  seniorDesc: string;
  status: string;
}

export const useFares = () => {
  const [rates, setRates] = useState<FareRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFares();
  }, []);

  const fetchFares = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/fares");
      if (!res.ok) throw new Error("Failed to fetch fares");
      const data = await res.json();

      const formatted: FareRate[] = data.map((f: any) => ({
        id: f.routes?.code || "UNK",
        route: f.routes?.name || "Unknown Route",
        base: Number(f.base_fare),
        perKm: Number(f.per_km_rate),
        studentDesc: `${f.student_discount_pct}%`,
        seniorDesc: `${f.senior_discount_pct}%`,
        status: f.status === "active" ? "Active" : "Draft"
      }));
      setRates(formatted);
    } catch(err) {
      console.error("Error fetching fares:", err);
    }
    setIsLoading(false);
  };

  return {
    rates,
    isLoading,
    refreshFares: fetchFares
  };
};
