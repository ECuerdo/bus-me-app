"use client";

import React from "react";
import { 
  ShieldCheck, 
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompliance } from "./hooks/useCompliance";
import { ComplianceStats } from "./components/ComplianceStats";
import { ComplianceTable } from "./components/ComplianceTable";
import { IncidentProtocol } from "./components/IncidentProtocol";
import { ArchiveNode } from "./components/ArchiveNode";

export default function ComplianceModule() {
  const { 
    complianceData, 
    incidentLogs, 
    stats 
  } = useCompliance();

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Regulatory Oversight
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Safety & <span className="text-primary italic">Compliance</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Ensuring <span className="text-foreground font-bold italic underline decoration-rose-500/20 decoration-2">zero-bypass</span> of national transport protocols.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-6 gap-2 font-black rounded-2xl border-primary/20 hover:bg-primary/5 transition-all text-primary bg-card/40">
             <Printer className="h-4 w-4" />
             Annual Audit
           </Button>
           <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
             <ShieldCheck className="h-4 w-4" />
             Verify Network
           </Button>
        </div>
      </div>

      <ComplianceStats stats={stats} />

      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter text-foreground">Regulatory Framework</h2>
            <div className="flex gap-2">
               <Badge variant="outline" className="bg-emerald-500/5 text-emerald-600 border-emerald-500/20 font-black text-[9px] uppercase tracking-widest px-3 py-1">All Systems Active</Badge>
            </div>
         </div>

         <ComplianceTable records={complianceData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <IncidentProtocol logs={incidentLogs} />
         <ArchiveNode />
      </div>
    </div>
  );
}
