"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle2, MoreHorizontal, MapPin, Wrench, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Incident = {
  id: string;
  unit: string;
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  location: string;
  time: string;
  status: "Reported" | "Responding" | "Resolved";
};

const mockIncidents: Incident[] = [
  { id: "INC-892", unit: "Unit 112", type: "Engine Stall", severity: "Critical", location: "Express Gamma - KM 14", time: "10m ago", status: "Reported" },
  { id: "INC-891", unit: "Unit 445", type: "Tire Blowout", severity: "High", location: "Metro Loop Z", time: "25m ago", status: "Responding" },
  { id: "INC-890", unit: "Unit 201", type: "Minor Collision", severity: "Medium", location: "Coastal Beta", time: "1h ago", status: "Resolved" },
  { id: "INC-889", unit: "Unit 319", type: "Passenger Medical", severity: "Critical", location: "Northern Pass", time: "2m ago", status: "Responding" },
];

const severityColors = {
  Critical: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  High: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const IncidentCard = ({ incident }: { incident: Incident }) => {
  return (
    <div className="p-5 rounded-2xl bg-card border border-primary/5 shadow-md flex flex-col gap-4 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all group">
      <div className="flex justify-between items-start">
        <Badge variant="outline" className={cn("px-2 py-0.5 text-[9px] uppercase font-black tracking-widest", severityColors[incident.severity])}>
          {incident.severity}
        </Badge>
        <button className="text-muted-foreground hover:text-foreground transition-colors group-hover:opacity-100 opacity-30">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      
      <div>
        <h4 className="font-black text-sm text-foreground my-1 tracking-tight">{incident.type}</h4>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground">
          <MapPin className="h-3 w-3 text-primary/60" /> {incident.location}
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-border/50">
        <span className="font-black text-xs text-primary">{incident.unit}</span>
        <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/80">
          <Clock className="h-3 w-3" /> {incident.time}
        </div>
      </div>
    </div>
  );
}

export const IncidentBoard = () => {
  const reported = mockIncidents.filter((i) => i.status === "Reported");
  const responding = mockIncidents.filter((i) => i.status === "Responding");
  const resolved = mockIncidents.filter((i) => i.status === "Resolved");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Column 1: Reported */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-500" /> Reported
          </h3>
          <Badge className="bg-rose-500 hover:bg-rose-600 text-rose-50 font-black">{reported.length}</Badge>
        </div>
        <div className="p-4 rounded-[2rem] bg-muted/20 border-2 border-dashed border-border min-h-[50vh] flex flex-col gap-4">
          {reported.map(incident => <IncidentCard key={incident.id} incident={incident} />)}
        </div>
      </div>

      {/* Column 2: Responding */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
            <Wrench className="h-4 w-4 text-amber-500" /> Responding
          </h3>
          <Badge className="bg-amber-500 hover:bg-amber-600 text-amber-50 font-black">{responding.length}</Badge>
        </div>
        <div className="p-4 rounded-[2rem] bg-muted/20 border-2 border-dashed border-border min-h-[50vh] flex flex-col gap-4">
          {responding.map(incident => <IncidentCard key={incident.id} incident={incident} />)}
        </div>
      </div>

      {/* Column 3: Resolved */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-black text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Resolved
          </h3>
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-emerald-50 font-black">{resolved.length}</Badge>
        </div>
        <div className="p-4 rounded-[2rem] bg-muted/20 border-2 border-dashed border-border min-h-[50vh] flex flex-col gap-4">
          {resolved.map(incident => <IncidentCard key={incident.id} incident={incident} />)}
        </div>
      </div>

    </div>
  );
}
