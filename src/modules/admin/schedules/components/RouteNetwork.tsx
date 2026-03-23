"use client";

import React from "react";
import { Navigation, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TransitRoute } from "../types";

interface RouteNetworkProps {
  routes: TransitRoute[];
}

export const RouteNetwork = ({ routes }: RouteNetworkProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {routes.map((route, i) => (
        <div key={i} className="card-premium p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border shadow-sm group hover:bg-white/5 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Navigation className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary font-black text-[9px] uppercase tracking-widest">{route.distance}</Badge>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-black tracking-tighter mb-1 text-foreground">{route.name}</h4>
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground opacity-70">
                {route.origin} <ArrowRight className="h-3 w-3" /> {route.destination}
              </div>
            </div>
            <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Base Fare</p>
                <p className="font-black text-sm text-primary">{route.fare}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Stopovers</p>
                <p className="font-black text-sm text-foreground">{route.stops} Terminals</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
