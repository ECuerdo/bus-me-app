"use client";

import React from "react";
import { Clock, Route, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const routesData = [
  { name: "Express Gamma", onTime: 94, delays: 12, rating: "A+" },
  { name: "Coastal Run Beta", onTime: 82, delays: 45, rating: "B-" },
  { name: "Arterial Route C", onTime: 76, delays: 89, rating: "C" },
];

export const RouteEfficiency = () => {
  return (
    <div className="col-span-full xl:col-span-4 rounded-[2rem] border border-primary/5 bg-card/40 backdrop-blur-md p-6 lg:p-8 flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-2">
            <Route className="h-5 w-5 text-primary" /> Route Efficiency Index
          </h3>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Punctuality vs Traffic Delays</p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
         {routesData.map((route, i) => (
            <div key={i} className="flex flex-col gap-3">
               <div className="flex justify-between items-center">
                  <span className="font-black text-sm text-foreground">{route.name}</span>
                  <Badge variant="outline" className={route.rating.includes('A') ? "border-emerald-500/20 text-emerald-600 bg-emerald-500/10 font-black text-[10px]" : "border-amber-500/20 text-amber-600 bg-amber-500/10 font-black text-[10px]"}>
                     Grade {route.rating}
                  </Badge>
               </div>
               <div className="h-4 w-full bg-muted/30 rounded-full overflow-hidden flex shadow-inner">
                  <div style={{ width: `${route.onTime}%` }} className="h-full bg-primary flex items-center justify-center text-[9px] font-black text-primary-foreground px-2">
                     {route.onTime}% On-Time
                  </div>
                  <div style={{ width: `${100 - route.onTime}%` }} className="h-full bg-rose-500/80 flex items-center justify-end text-[9px] font-black text-white px-2">
                     {100 - route.onTime}%
                  </div>
               </div>
               <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-primary" /> Reliable Departures</span>
                  <span className="flex items-center gap-1.5 text-rose-500"><AlertTriangle className="h-3 w-3" /> {route.delays} Logged Delays</span>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
