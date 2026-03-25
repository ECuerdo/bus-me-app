"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DashboardStat } from "../types";

interface StatsGridProps {
  stats: DashboardStat[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={cn(
            "group relative p-6 cursor-pointer rounded-2xl bg-card border border-primary/5 shadow-md overflow-hidden transition-all duration-300",
            "before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-xl transition-all duration-500 group-hover:scale-110 shadow-lg", stat.bg, stat.color, stat.glow)}>
              <stat.icon className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="bg-muted/10 border-none font-black text-[10px] tracking-tight py-1 px-2 uppercase">
              {stat.change}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-black tracking-[0.15em] text-muted-foreground/60">{stat.label}</p>
            <h2 className="text-2xl font-black tracking-tighter text-foreground group-hover:translate-x-1 transition-transform tabular-nums">
              {stat.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};
