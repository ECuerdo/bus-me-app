"use client";

import React from "react";
import { Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOverview } from "./hooks/useOverview";
import { StatsGrid } from "./components/StatsGrid";
import { LiveTelemetry } from "./components/LiveTelemetry";
import { OccupancyManifest } from "./components/OccupancyManifest";
import { GlobalRevenue } from "./components/GlobalRevenue";

export default function OverviewModule() {
  const { stats, occupancy, revenue } = useOverview();

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Command Center
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter text-foreground leading-none">
            Operational <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm">
            Real-time fleet telemetry for <span className="text-foreground font-bold italic underline decoration-primary/50 decoration-2">BusMe Enterprise</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
             <MapIcon className="h-4 w-4" />
             Live GPS Map
           </Button>
        </div>
      </div>

      {/* Trip Status Summary */}
      <StatsGrid stats={stats} />

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Live GPS Tracking Real Map */}
        <LiveTelemetry />

        {/* Passenger Occupancy & Active Trips */}
        <div className="lg:col-span-3 space-y-6">
           <OccupancyManifest occupancy={occupancy} />
           <GlobalRevenue revenue={revenue} />
        </div>
      </div>
    </div>
  );
}
