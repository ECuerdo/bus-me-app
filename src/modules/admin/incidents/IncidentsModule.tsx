"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Siren, PhoneCall, FileWarning } from "lucide-react";
import { IncidentBoard } from "./components/IncidentBoard";

export default function IncidentsModule() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="outline" className="border-none bg-rose-500/10 text-rose-500 font-black text-[10px] tracking-widest uppercase px-2 shadow-inner mb-2 animate-pulse">Critical Alerts</Badge>
          <h1 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">
            Incident Command <Siren className="h-6 w-6 text-rose-500" />
          </h1>
          <p className="text-xs font-bold text-muted-foreground/80 lowercase">tracking 3 active disruptions across network</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline" className="rounded-xl font-bold text-xs"><PhoneCall className="w-4 h-4 mr-2" /> Dispatch COMMS</Button>
          <Button className="rounded-xl bg-orange-500 hover:bg-orange-600 font-black text-xs uppercase tracking-widest shadow-lg shadow-orange-500/20"><FileWarning className="w-4 h-4 mr-2" /> Log Incident</Button>
        </div>
      </div>

      <IncidentBoard />
    </div>
  );
}
