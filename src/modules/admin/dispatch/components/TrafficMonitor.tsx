"use client";

import React from "react";
import { AlertCircle, ArrowRight, Rss } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const incidents = [
  { id: 1, route: "Express Gamma", delay: "45 mins", reason: "Major collision at Exit 4", severity: "Critical" },
  { id: 2, route: "Coastal Run Beta", delay: "15 mins", reason: "Heavy rain / flooded zones", severity: "High" },
  { id: 3, route: "Arterial Route C", delay: "5 mins", reason: "Standard rush hour volume", severity: "Low" },
];

export const TrafficMonitor = () => {
  return (
    <div className="p-6 rounded-2xl bg-card border border-primary/5 shadow-md flex-shrink-0 flex flex-col h-full">
       <h3 className="font-black text-sm uppercase tracking-widest text-foreground flex items-center gap-2 mb-6">
         <AlertCircle className="h-4 w-4 text-orange-500" /> Traffic & Delays
       </h3>

       <div className="space-y-4 flex-1">
          {incidents.map((inc) => (
             <div key={inc.id} className="p-4 rounded-xl border border-primary/5 bg-muted/20 hover:bg-muted/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                   <span className="font-black text-xs text-foreground">{inc.route}</span>
                   <Badge variant="outline" className={inc.severity === "Critical" ? "text-rose-500 border-rose-500/20 bg-rose-500/10 text-[9px] uppercase px-2 font-black tracking-tighter" : "text-orange-500 border-orange-500/20 bg-orange-500/10 text-[9px] uppercase px-2 font-black tracking-tighter"}>
                      +{inc.delay}
                   </Badge>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">{inc.reason}</p>
             </div>
          ))}
       </div>

       <button className="w-full mt-4 h-10 rounded-xl bg-orange-500/10 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:bg-orange-500/20 transition-all flex items-center justify-center gap-2">
          <Rss className="h-3 w-3" /> Broadcast Reroute
       </button>
    </div>
  );
};
