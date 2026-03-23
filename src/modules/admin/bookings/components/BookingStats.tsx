"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookingStat } from "../types";

interface BookingStatsProps {
  stats: BookingStat[];
}

export const BookingStats = ({ stats }: BookingStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, i) => (
        <div key={i} className="p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 group">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-xl", stat.col.replace('text', 'bg') + '/10', stat.col)}>
              <stat.icon className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="border-none font-black text-[9px] uppercase tracking-widest opacity-60 text-foreground">Real-time</Badge>
          </div>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{stat.label}</p>
          <h4 className="text-3xl font-black tracking-tighter tabular-nums text-foreground">{stat.val}</h4>
        </div>
      ))}
    </div>
  );
};
