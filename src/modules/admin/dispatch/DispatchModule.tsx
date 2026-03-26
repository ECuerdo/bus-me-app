"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Settings2, ShieldAlert } from "lucide-react";
import { TrafficMonitor } from "./components/TrafficMonitor";
import { BroadcastSystem } from "./components/BroadcastSystem";
import { MissionModal } from "../schedules/components/MissionModal";

// React Leaflet must be imported dynamically without SSR
const LiveMap = dynamic(() => import("./components/LiveMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-card rounded-2xl border border-primary/5 shadow-md">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <span className="font-black text-xs tracking-widest uppercase text-muted-foreground animate-pulse">Initializing GIS Interface...</span>
      </div>
    </div>
  )
});

export default function DispatchModule() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="outline" className="border-none bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase px-2 shadow-inner mb-2">Live Operations</Badge>
          <h1 className="text-3xl font-black tracking-tighter text-foreground">Active Dispatch</h1>
          <p className="text-xs font-bold text-muted-foreground/80 lowercase">tracking 42 active units across standard grids</p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Button variant="outline" className="rounded-xl font-bold text-xs"><Settings2 className="w-4 h-4 mr-2" /> Global Config</Button>
          <MissionModal />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
        {/* Sidebar Status Info */}
        <div className="lg:col-span-1 space-y-6 flex flex-col h-full overflow-hidden">
           <TrafficMonitor />
           <BroadcastSystem />
        </div>

        {/* Dynamic Map Component */}
        <div className="lg:col-span-3 rounded-[2rem] border-[4px] border-card bg-muted/20 overflow-hidden shadow-xl relative ring-1 ring-primary/10">
           <LiveMap />
        </div>
      </div>
    </div>
  );
}
