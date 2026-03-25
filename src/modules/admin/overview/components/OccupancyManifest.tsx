"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PassengerDensity } from "../types";

interface OccupancyManifestProps {
  occupancy: PassengerDensity[];
}

export const OccupancyManifest = ({ occupancy }: OccupancyManifestProps) => {
  return (
    <div className="rounded-2xl border bg-card p-8 shadow-sm border-primary/5 text-card-foreground">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black tracking-tighter text-foreground">Passenger Density</h3>
        <TrendingUp className="h-5 w-5 text-primary" />
      </div>

      <div className="space-y-6">
        {occupancy.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="font-black text-sm text-foreground">
                  {item.bus} 
                  <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase ml-2">{item.route}</span>
                </p>
              </div>
              <p className="text-xs font-black tabular-nums text-foreground">{item.occupancy}/{item.capacity}</p>
            </div>
            <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
              <div 
                style={{ width: `${(item.occupancy/item.capacity)*100}%` }}
                className={cn("h-full rounded-full transition-all duration-1000", 
                  item.occupancy > 40 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : 
                  item.occupancy > 30 ? "bg-emerald-500" : "bg-primary"
                )} 
              />
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-8 h-12 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 font-black text-xs uppercase tracking-widest transition-all">
        Full Occupancy Manifest
      </Button>
    </div>
  );
};
