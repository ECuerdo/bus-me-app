"use client";

import React from "react";
import { motion } from "framer-motion";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NetworkShare } from "../types";

interface NetworkDistributionProps {
  distribution: NetworkShare[];
}

export const NetworkDistribution = ({ distribution }: NetworkDistributionProps) => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="p-8 rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md shadow-sm">
        <h3 className="text-xl font-black tracking-tighter mb-6 text-foreground">Network Distribution</h3>
        <div className="space-y-6">
          {distribution.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="font-black text-xs tracking-tight text-foreground">{item.region}</span>
                <span className="text-xs font-black tabular-nums text-foreground">{item.share}%</span>
              </div>
              <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.share}%` }}
                  className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group">
        <Map className="absolute -right-8 -top-8 h-40 w-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10 space-y-4">
          <h3 className="text-xl font-black tracking-tighter">Daily Manifest</h3>
          <p className="text-xs font-medium opacity-80">Generate the complete logistical manifest for all scheduled missions today.</p>
          <Button className="w-full h-12 rounded-2xl bg-white text-primary font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95 border-none">Download PDF Manifest</Button>
        </div>
      </div>
    </div>
  );
};
