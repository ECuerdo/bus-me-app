"use client";

import React from "react";
import { 
  Calendar, 
  Navigation,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSchedules } from "./hooks/useSchedules";
import { MissionModal } from "./components/MissionModal";
import { ScheduleTable } from "./components/ScheduleTable";
import { RouteNetwork } from "./components/RouteNetwork";
import { ScheduleStats } from "./components/ScheduleStats";

import { ScheduleGenerator } from "./components/ScheduleGenerator";

export default function SchedulesModule() {
  const { 
    searchTerm, 
    setSearchTerm, 
    schedules, 
    routes, 
    stats 
  } = useSchedules();

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Mission Logistics
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Global <span className="text-primary italic">Schedules</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Managing <span className="text-foreground font-bold italic">24 active routes</span> and <span className="text-foreground font-bold italic">112 daily missions</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 gap-2 font-black rounded-2xl border-rose-500/20 text-rose-500 hover:bg-rose-500/5 transition-all">
             <AlertTriangle className="h-4 w-4" />
             Emergency Dispatch
          </Button>
          <MissionModal />
        </div>
      </div>

      <Tabs defaultValue="scheduling" className="w-full">
         <TabsList className="h-14 w-full justify-start gap-4 bg-muted/20 backdrop-blur-md border border-primary/5 text-card-foreground p-2 rounded-2xl mb-8">
            <TabsTrigger value="scheduling" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
               <Calendar className="h-3.5 w-3.5 mr-2" />
               Current Schedule
            </TabsTrigger>
            <TabsTrigger value="generator" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
               <Calendar className="h-3.5 w-3.5 mr-2" />
               Generator
            </TabsTrigger>
            <TabsTrigger value="network" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
               <Navigation className="h-3.5 w-3.5 mr-2" />
               Route Network
            </TabsTrigger>
         </TabsList>

         <TabsContent value="scheduling" className="space-y-8 mt-0 outline-none">
            <ScheduleStats stats={stats} />
            <ScheduleTable schedules={schedules} />
         </TabsContent>

         <TabsContent value="generator" className="mt-0 outline-none">
            <ScheduleGenerator />
         </TabsContent>

         <TabsContent value="network" className="mt-0 outline-none">
            <RouteNetwork routes={routes} />
         </TabsContent>
      </Tabs>
    </div>
  );
}
