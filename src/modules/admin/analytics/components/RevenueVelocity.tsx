"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RevenuePoint } from "../types";

interface RevenueVelocityProps {
  timeline: RevenuePoint[];
}

export const RevenueVelocity = ({ timeline }: RevenueVelocityProps) => {
  return (
    <div className="lg:col-span-4 p-8 rounded-2xl border border-primary/5 bg-card shadow-md">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-black tracking-tighter text-foreground">Revenue Velocity</h3>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">7-Day Transactional Flow</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-lg py-1 px-3 border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest">Aggregate View</Badge>
        </div>
      </div>

      <div className="h-[250px] w-full flex items-end justify-between gap-4 px-4">
        {timeline.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
            <div className="w-full relative">
              <div 
                style={{ height: `${item.value}%` }}
                className={cn("w-full rounded-t-2xl transition-all duration-500 bg-gradient-to-t from-primary/20 to-primary", 
                  item.value > 80 ? "shadow-[0_0_20px_rgba(var(--primary),0.3)] opacity-100" : "opacity-60 grayscale group-hover/bar:grayscale-0 group-hover/bar:opacity-100"
                )}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-[10px] opacity-0 group-hover/bar:opacity-100 transition-opacity tabular-nums text-foreground">
                {item.value}%
              </div>
            </div>
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
