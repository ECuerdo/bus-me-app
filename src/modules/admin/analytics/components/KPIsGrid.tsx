"use client";

import React from "react";
import { TrendingUp, BarChart3, Zap, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PerformanceMetric } from "../types";

interface KPIsGridProps {
  metrics: PerformanceMetric[];
}

export const KPIsGrid = ({ metrics }: KPIsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((data, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl bg-card border border-primary/5 shadow-md relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
             <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                {i === 0 ? <TrendingUp className="h-5 w-5" /> : i === 1 ? <BarChart3 className="h-5 w-5" /> : i === 2 ? <Zap className="h-5 w-5" /> : <Target className="h-5 w-5" />}
             </div>
             <Badge variant="outline" className={cn("border-none font-black text-[10px] tracking-tight py-1 px-2 uppercase shadow-inner", 
               data.status === 'up' ? "bg-emerald-500/10 text-emerald-600" : 
               data.status === 'down' ? "bg-rose-500/10 text-rose-600" : "bg-blue-500/10 text-blue-600"
             )}>
               {data.status === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : data.status === 'down' ? <ArrowDownRight className="h-3 w-3 mr-1" /> : null}
               {data.trend}
             </Badge>
          </div>
          <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60 mb-1">{data.label}</p>
          <h2 className="text-2xl font-black tracking-tighter text-foreground group-hover:translate-x-1 transition-transform tabular-nums">
            {data.value}
          </h2>
        </div>
      ))}
    </div>
  );
};
