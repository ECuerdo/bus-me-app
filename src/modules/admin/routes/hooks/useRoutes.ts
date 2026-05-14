import { useState, useMemo, useEffect } from "react";
import { TransitRoute } from "../types";
import { routesProvider } from "../fetchProviders/routesProvider";

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
      const formattedRoutes = await routesProvider.getRoutes();
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
