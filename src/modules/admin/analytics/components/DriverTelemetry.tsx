"use client";

import React from "react";
import { UserCheck, Fuel, AlertCircle, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const driverStats = [
  { name: "Juan Dela Cruz", rating: 4.8, fuelScore: 92, incidents: 0 },
  { name: "Maria Santos", rating: 4.9, fuelScore: 88, incidents: 1 },
  { name: "Pedro Penduko", rating: 4.5, fuelScore: 76, incidents: 3 },
];

export const DriverTelemetry = () => {
  return (
    <div className="col-span-full xl:col-span-3 rounded-[2rem] border border-primary/5 bg-card/40 backdrop-blur-md p-6 lg:p-8 flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" /> Personnel Telemetry
          </h3>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Driver Performance & Safety</p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
         {driverStats.map((driver, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-muted/20 border border-primary/5 hover:bg-muted/40 transition-colors">
               <div className="flex items-center gap-3 w-48">
                  <Avatar className="h-10 w-10 border border-primary/10 shadow-sm">
                     <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`} />
                     <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                     <span className="font-black text-sm text-foreground block">{driver.name}</span>
                     <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500" /> {driver.rating} Rating
                     </span>
                  </div>
               </div>

               <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="flex flex-col justify-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-primary" /> Fuel Efficiency
                     </span>
                     <div className="h-2 w-full bg-muted/50 flex rounded-full overflow-hidden">
                        <div style={{ width: `${driver.fuelScore}%` }} className="bg-primary h-full"></div>
                     </div>
                  </div>
                  <div className="flex flex-col justify-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-rose-500" /> Incidents
                     </span>
                     <span className="font-black text-xs text-foreground bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-lg w-fit border border-rose-500/20">
                        {driver.incidents} Logs
                     </span>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
