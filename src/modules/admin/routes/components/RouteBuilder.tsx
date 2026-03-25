"use client";

import React, { useState } from "react";
import { Plus, MapPin, Search, Navigation, Clock, Activity, GripVertical, Trash2, Route } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const mockStops = [
  { id: 1, name: "Main Terminal A", distance: "0 km", time: "0 mins" },
  { id: 2, name: "City Center Hub", distance: "12 km", time: "25 mins" },
  { id: 3, name: "Northridge Mall", distance: "28 km", time: "45 mins" },
  { id: 4, name: "Provincial Border", distance: "52 km", time: "90 mins" },
];

export const RouteBuilder = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <Route className="h-5 w-5" />
          Construct Route Path
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-primary/5 rounded-2xl bg-background/95 backdrop-blur-3xl shadow-2xl">
         <div className="p-8 pb-4 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-3">
               Route Infrastructure Suite <Badge className="bg-primary/20 text-primary hover:bg-primary/30 font-black tracking-widest uppercase text-[9px] shadow-none">BETA</Badge>
            </DialogTitle>
            <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">
              Define waypoints, calculate distances, and establish transit corridors.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Route Designation</Label>
               <Input placeholder="e.g. Express Loop 4B" className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background shadow-inner" />
            </div>
            <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Service Class</Label>
               <div className="flex bg-muted/30 h-12 rounded-xl p-1 shadow-inner border border-primary/5">
                  <div className="flex-1 bg-background rounded-lg flex items-center justify-center font-black text-xs text-primary shadow-sm border border-primary/10 uppercase tracking-widest cursor-pointer">Express</div>
                  <div className="flex-1 rounded-lg flex items-center justify-center font-bold text-xs text-muted-foreground uppercase tracking-widest cursor-pointer hover:bg-background/50 transition-colors">Standard</div>
               </div>
            </div>
          </div>
         </div>

         <div className="px-8 pb-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-black text-sm uppercase tracking-widest text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Waypoint Sequence
                </h4>
                <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-1 border-primary/20 text-primary shadow-sm hover:bg-primary/5">
                  <Plus className="h-3 w-3" /> Add Stop
                </Button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {mockStops.map((stop, idx) => (
                   <div key={stop.id} className="group relative flex items-center gap-4 bg-muted/20 border border-primary/5 p-3 rounded-2xl hover:bg-muted/40 hover:border-primary/20 transition-all">
                      <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors p-2 -ml-2">
                         <GripVertical className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-md shadow-primary/20">
                               {idx + 1}
                            </div>
                            <span className="font-black text-sm text-foreground">{stop.name}</span>
                         </div>
                         
                         <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                               <Navigation className="h-3.5 w-3.5 text-primary opacity-70" /> {stop.distance}
                            </div>
                            <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                               <Clock className="h-3.5 w-3.5 text-primary opacity-70" /> {stop.time}
                            </div>
                         </div>
                      </div>

                      <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/10 hover:text-rose-600 rounded-lg">
                         <Trash2 className="h-4 w-4" />
                      </Button>
                   </div>
                ))}
            </div>
            
            <DialogFooter className="pt-6 border-t border-border mt-4">
              <Button type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">Publish Route Infrastructure</Button>
            </DialogFooter>
         </div>
      </DialogContent>
    </Dialog>
  );
};
