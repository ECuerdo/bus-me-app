"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ScheduleStat } from "../types";

interface ScheduleStatsProps {
  stats: ScheduleStat[];
}

export const ScheduleStats = ({ stats }: ScheduleStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="p-6 rounded-[2rem] bg-card/40 backdrop-blur-md border border-border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black tracking-tighter tabular-nums text-foreground">{stat.val}</h4>
          </div>
          <stat.icon className={cn("h-7 w-7 opacity-20", stat.col)} />
        </div>
      ))}
    </div>
  );
};
