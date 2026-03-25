"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FleetStats } from "../types";

interface MaintenanceStatsProps {
  stats: FleetStats[];
}

export const MaintenanceStats = ({ stats }: MaintenanceStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="p-6 rounded-[2rem] bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground/50 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-all duration-300">
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.1em] mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black tracking-tighter tabular-nums text-foreground group-hover:translate-x-1 transition-transform">{stat.val}</h4>
            </div>
            <stat.icon className={cn("h-8 w-8 opacity-20 transition-all group-hover:scale-110 group-hover:opacity-100", stat.col)} />
        </div>
      ))}
    </div>
  );
};
