"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ComplianceStat } from "../types";

interface ComplianceStatsProps {
  stats: ComplianceStat[];
}

export const ComplianceStats = ({ stats }: ComplianceStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, i) => (
        <div key={i} className="p-8 rounded-2xl bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground shadow-sm flex items-center justify-between group">
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{stat.label}</p>
            <h4 className="text-3xl font-black tracking-tighter tabular-nums text-foreground">{stat.val}</h4>
          </div>
          <stat.icon className={cn("h-10 w-10 opacity-20", stat.col)} />
        </div>
      ))}
    </div>
  );
};
