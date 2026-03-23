"use client";

import React from "react";
import { motion } from "framer-motion";
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
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={cn(
            "card-premium group relative p-6 cursor-pointer border-white/40 shadow-sm rounded-[2rem] bg-card/40 backdrop-blur-md border overflow-hidden",
            "before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
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
        </motion.div>
      ))}
    </div>
  );
};
