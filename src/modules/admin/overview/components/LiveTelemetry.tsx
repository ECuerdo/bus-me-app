"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Activity, Map as MapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MapComponent = dynamic(() => import("./MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        <MapIcon className="h-10 w-10 text-primary/40 animate-bounce" />
        <p className="text-[10px] font-black uppercase tracking-widening text-muted-foreground">Initializing Cartographic Engine...</p>
      </div>
    </div>
  )
});

export const LiveTelemetry = () => {
  return (
    <div className="lg:col-span-4 min-h-[450px] rounded-[3rem] border bg-card/10 dark:bg-card/20 backdrop-blur-sm shadow-2xl border-primary/5 text-card-foreground relative overflow-hidden group transition-colors duration-500">
      {/* Real Leaflet Map */}
      <div className="absolute inset-0">
        <MapComponent />
      </div>

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="p-8 flex items-center justify-between pointer-events-auto">
          <div className="space-y-1">
            <h3 className="text-2xl font-black tracking-tighter text-foreground drop-shadow-sm">Live Network Telemetry</h3>
            <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Real-time GPS Positioning</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-[10px] h-6 px-3 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              18 BUSES ONLINE
            </Badge>
          </div>
        </div>
        
        <div className="mt-auto p-6 m-8 rounded-[2rem] bg-card/40 backdrop-blur-xl border border-primary/5 text-card-foreground shadow-2xl max-w-sm pointer-events-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Activity className="h-6 w-6 animate-[pulse_2s_infinite]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Link</p>
                <p className="font-extrabold text-sm text-foreground">Main Arterial Route Alpha</p>
              </div>
            </div>
            <Button variant="outline" className="h-10 rounded-xl font-black text-[10px] uppercase tracking-widest border-primary/20 hover:bg-primary/10 text-primary ml-4">Focus</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
