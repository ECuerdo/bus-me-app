"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IncidentLog } from "../types";

interface IncidentProtocolProps {
  logs: IncidentLog[];
}

export const IncidentProtocol = ({ logs }: IncidentProtocolProps) => {
  return (
    <div className="p-10 rounded-[3rem] bg-gradient-to-br from-rose-500/5 to-rose-500/10 border border-rose-500/10 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-600">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black tracking-tighter text-foreground">Incident Protocol</h3>
      </div>
      <p className="text-sm font-medium text-muted-foreground leading-relaxed">Automated tracking of network deviations and mechanical failures.</p>
      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-card/40 border border-primary/5 text-card-foreground shadow-inner">
            <div className="flex flex-col">
              <span className="font-black text-xs text-foreground">{log.type}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">{log.unit} • {log.date}</span>
            </div>
            <Badge variant="outline" className={cn("font-black text-[8px] uppercase tracking-widest px-2 py-0.5", 
              log.severity === 'Low' ? "border-emerald-500/20 text-emerald-600" : "border-rose-500/20 text-rose-600"
            )}>{log.severity} Matrix</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
