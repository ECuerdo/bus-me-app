"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock, Save, Copy, FileOutput, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockTimeBlocks = [
  { time: "05:00 AM", status: "Active", route: "Arterial C", driver: "J. Dela Cruz", bus: "Unit 401" },
  { time: "06:30 AM", status: "Active", route: "Arterial C", driver: "M. Santos", bus: "Unit 228" },
  { time: "08:00 AM", status: "Empty", route: "-", driver: "-", bus: "-" },
  { time: "09:30 AM", status: "Empty", route: "-", driver: "-", bus: "-" },
  { time: "11:00 AM", status: "Empty", route: "-", driver: "-", bus: "-" },
];

export const ScheduleGenerator = () => {
  return (
    <div className="rounded-[2.5rem] border border-primary/5 bg-card/40 backdrop-blur-md shadow-lg overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 border-r border-primary/5 bg-muted/10 p-6 flex flex-col gap-6">
         <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-foreground flex items-center gap-2 mb-4">
              <CalendarIcon className="h-4 w-4 text-primary" /> Schedule Matrix
            </h3>
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Select Transit Route</label>
                 <Select defaultValue="arterial-c">
                   <SelectTrigger className="w-full h-12 rounded-xl bg-background border-primary/5 font-bold shadow-sm">
                     <SelectValue placeholder="Select Route" />
                   </SelectTrigger>
                   <SelectContent className="rounded-xl border-primary/5">
                     <SelectItem value="arterial-c">Arterial Route C</SelectItem>
                     <SelectItem value="coastal-beta">Coastal Run Beta</SelectItem>
                     <SelectItem value="express-gamma">Express Gamma</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               
               <div className="space-y-2">
                 <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Frequency Interval</label>
                 <Select defaultValue="90m">
                   <SelectTrigger className="w-full h-12 rounded-xl bg-background border-primary/5 font-bold shadow-sm">
                     <SelectValue placeholder="Select Interval" />
                   </SelectTrigger>
                   <SelectContent className="rounded-xl border-primary/5">
                     <SelectItem value="30m">30 Minutes (Peak)</SelectItem>
                     <SelectItem value="60m">1 Hour (Standard)</SelectItem>
                     <SelectItem value="90m">1.5 Hours (Off-Peak)</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
            </div>
         </div>

         <div className="mt-auto space-y-3">
            <Button className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
               Generate Blocks
            </Button>
            <div className="flex gap-2">
               <Button variant="outline" className="flex-1 h-10 rounded-lg font-bold text-[10px] uppercase tracking-widest border-primary/10 hover:bg-primary/5">
                  <Copy className="h-3 w-3 mr-2" /> Clone
               </Button>
               <Button variant="outline" className="flex-1 h-10 rounded-lg font-bold text-[10px] uppercase tracking-widest border-primary/10 hover:bg-primary/5">
                  <FileOutput className="h-3 w-3 mr-2" /> Export
               </Button>
            </div>
         </div>
      </div>

      {/* Main Timeline View */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
         <div className="flex items-center justify-between mb-8">
            <div>
               <h2 className="text-2xl font-black tracking-tighter text-foreground">Daily Operations Timeline</h2>
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Operational Window: 04:00 AM - 11:00 PM</p>
            </div>
            <Button variant="ghost" size="sm" className="h-9 gap-2 font-black text-[10px] uppercase tracking-widest text-primary hover:bg-primary/10 hover:text-primary rounded-lg border border-primary/20">
              <Save className="h-3.5 w-3.5" /> Commit Schedule
            </Button>
         </div>

         <div className="space-y-4">
            {mockTimeBlocks.map((block, idx) => (
               <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-center p-4 rounded-2xl bg-background border border-primary/5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-3 w-32 shrink-0">
                     <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Clock className="h-5 w-5" />
                     </div>
                     <span className="font-black text-sm text-foreground tabular-nums">{block.time}</span>
                  </div>
                  
                  {block.status === "Active" ? (
                     <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20 p-3 rounded-xl border border-primary/5">
                        <div className="flex flex-col">
                           <span className="font-bold text-xs uppercase text-primary tracking-widest">{block.route}</span>
                           <span className="font-black text-sm text-foreground">{block.bus}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10 text-[9px] font-black uppercase tracking-widest">Dispatched</Badge>
                           <span className="font-bold text-xs text-muted-foreground ml-2">{block.driver}</span>
                        </div>
                     </div>
                  ) : (
                     <div className="flex-1 flex items-center justify-center h-[70px] border-2 border-dashed border-border/50 rounded-xl bg-transparent hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-colors">
                        <span className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary flex items-center gap-2">
                           <Plus className="h-3 w-3" /> Assign Block
                        </span>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};
