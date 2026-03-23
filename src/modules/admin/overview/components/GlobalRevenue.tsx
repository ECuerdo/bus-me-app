"use client";

import React from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlobalRevenueProps {
  revenue: number;
}

export const GlobalRevenue = ({ revenue }: GlobalRevenueProps) => {
  return (
    <div className="rounded-[2.5rem] border bg-gradient-to-br from-primary via-primary to-primary/80 p-8 text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group border-none">
      <Zap className="absolute -right-8 -top-8 h-40 w-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
      <div className="relative z-10 space-y-4">
        <h3 className="text-xl font-black tracking-tighter leading-none">Global Revenue</h3>
        <div className="py-2">
          <span className="text-4xl font-black tracking-tighter">₱{revenue.toLocaleString()}</span>
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Net Operating Yield</p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <Button variant="secondary" className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 border-none text-white font-bold text-xs">Analyze Cashflow</Button>
        </div>
      </div>
    </div>
  );
};
