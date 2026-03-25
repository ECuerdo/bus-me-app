import { useState, useMemo } from "react";
import { TransitRoute } from "../types";

export const useRoutes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const routes: TransitRoute[] = [
    { id: "R-001", name: "Arterial Alpha", origin: "Manila", destination: "Baguio", distance: "246km", stops: 4, status: 'Active' },
    { id: "R-002", name: "Coastal Beta", origin: "Davao", destination: "Cebu", distance: "820km", stops: 2, status: 'Active' },
    { id: "R-003", name: "Island Gamma", origin: "Iloilo", destination: "Bacolod", distance: "45km", stops: 1, status: 'Inactive' },
  ];

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => 
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredRoutes,
    routes
  };
};
