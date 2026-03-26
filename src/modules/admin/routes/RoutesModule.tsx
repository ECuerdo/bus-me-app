"use client";

import React from "react";
import { 
  Plus, 
  Search, 
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRoutes } from "./hooks/useRoutes";
import { RouteModal } from "./components/RouteModal";
import { RoutesTable } from "./components/RoutesTable";

import { RouteBuilder } from "./components/RouteBuilder";

export default function RoutesModule() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredRoutes,
    refreshRoutes
  } = useRoutes();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Network Architecture
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Route <span className="text-primary italic">Definitions</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Optimizing <span className="text-foreground font-bold italic">24 active paths</span> for maximum operational efficiency.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RouteBuilder onRouteAdded={refreshRoutes} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground shadow-sm">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            placeholder="Search network nodes..." 
            className="h-11 w-full pl-12 bg-transparent border-none outline-none font-bold text-sm text-foreground placeholder:text-muted-foreground/40"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all bg-card/40 border-primary/5 text-card-foreground text-primary">
             <Filter className="h-4 w-4" />
             Layer Filter
           </Button>
        </div>
      </div>

      <RoutesTable routes={filteredRoutes} />
    </div>
  );
}
