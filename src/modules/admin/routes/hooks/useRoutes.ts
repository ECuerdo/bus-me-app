import { useState, useMemo, useEffect } from "react";
import { TransitRoute } from "../types";

export const useRoutes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [routes, setRoutes] = useState<TransitRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/routes");
      if (!res.ok) throw new Error("Failed to fetch routes");
      const data = await res.json();

      const formattedRoutes: TransitRoute[] = data.map((r: any) => ({
        id: r.code,
        name: r.name,
        origin: r.origin,
        destination: r.destination,
        distance: r.distance_km + "km",
        stops: 4,
        status: r.status === "active" ? "Active" : r.status === "draft" ? "Under Review" : "Inactive"
      }));
      setRoutes(formattedRoutes);
    } catch(err) {
      console.error("Error fetching routes:", err);
    }
    setIsLoading(false);
  };

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, routes]);

  return {
    searchTerm,
    setSearchTerm,
    filteredRoutes,
    routes,
    isLoading,
    refreshRoutes: fetchRoutes
  };
};
