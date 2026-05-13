"use client";

import React from "react";
import { AlertCircle, ArrowRight, Rss, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIncidents } from "../hooks/useIncidents";
import { IncidentModal } from "./IncidentModal";

export const TrafficMonitor = () => {
  const { incidents, isLoading, refreshIncidents } = useIncidents();

  return (
    <div className="p-6 rounded-2xl bg-card border border-primary/5 shadow-md flex-shrink-0 flex flex-col h-full">
       <h3 className="font-black text-sm uppercase tracking-widest text-foreground flex items-center gap-2 mb-6">
         <AlertCircle className="h-4 w-4 text-orange-500" /> Traffic & Delays
       </h3>

       <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {isLoading && (
             <div className="flex flex-col items-center justify-center p-8 gap-3 text-muted-foreground opacity-50">
                <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                <span className="font-bold text-[10px] uppercase tracking-widest">Scanning Grid...</span>
             </div>
          )}
          {!isLoading && incidents.length === 0 && (
             <div className="flex flex-col items-center justify-center p-8 gap-3 text-emerald-500 opacity-60">
                <span className="font-bold text-[10px] uppercase tracking-widest">Grid Nominal. Zero Critical Events.</span>
             </div>
          )}
          {!isLoading && incidents.map((inc) => (
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

       <IncidentModal onIncidentAdded={refreshIncidents} />
    </div>
  );
};
