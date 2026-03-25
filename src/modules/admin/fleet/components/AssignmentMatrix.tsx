"use client";

import React, { useState } from "react";
import { Bus, UserCheck, ArrowRight, CheckCircle2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockBuses = [
  { id: "401", plate: "ABC-1234", route: "Arterial C", status: "Unassigned" },
  { id: "228", plate: "XYZ-9876", route: "Coastal Beta", status: "Assigned" },
  { id: "112", plate: "DEF-4567", route: "Express Gamma", status: "Unassigned" },
];

const mockDrivers = [
  { id: "DRV-001", name: "Juan Dela Cruz", rating: 4.8, status: "Available" },
  { id: "DRV-002", name: "Maria Santos", rating: 4.9, status: "Available" },
  { id: "DRV-045", name: "Pedro Penduko", rating: 4.5, status: "On Duty" },
];

export const AssignmentMatrix = () => {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [assigned, setAssigned] = useState(false);

  const handleAssign = () => {
    if (selectedBus && selectedDriver) {
      setAssigned(true);
      setTimeout(() => {
        setAssigned(false);
        setSelectedBus(null);
        setSelectedDriver(null);
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 border border-primary/5 bg-card/40 rounded-2xl shadow-sm p-5 space-y-4">
        <h3 className="font-black text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
          <Bus className="h-4 w-4 text-primary" /> Fleet Roster
        </h3>
        <div className="space-y-3">
          {mockBuses.map((bus) => (
            <button
              key={bus.id}
              onClick={() => setSelectedBus(bus.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-300",
                selectedBus === bus.id 
                  ? "bg-primary/10 border-primary shadow-md shadow-primary/10"
                  : "bg-muted/20 border-transparent hover:bg-muted/40 hover:border-primary/20"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-sm text-foreground">Unit {bus.id}</span>
                <Badge variant="outline" className={cn("text-[9px] uppercase px-2 py-0", bus.status === "Unassigned" ? "text-amber-500 border-amber-500/20 bg-amber-500/10" : "text-primary border-primary/20 bg-primary/10")}>
                  {bus.status}
                </Badge>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">{bus.plate} • {bus.route}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 border border-dashed border-primary/20 bg-primary/5 rounded-2xl">
         {selectedBus && selectedDriver ? (
           <div className="w-full space-y-6 text-center animate-in zoom-in-95 duration-500">
             <div className="flex items-center justify-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30 shadow-lg">
                  <Bus className="h-8 w-8" />
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="h-16 w-16 rounded-2xl bg-secondary/80 text-foreground flex items-center justify-center shadow-lg">
                  <UserCheck className="h-8 w-8" />
                </div>
             </div>
             
             <div>
               <h4 className="font-black tracking-tighter text-xl">Confirm Pairing</h4>
               <p className="text-xs font-bold text-muted-foreground mt-1">Unit {selectedBus} to {mockDrivers.find(d => d.id === selectedDriver)?.name}</p>
             </div>

             <Button 
               onClick={handleAssign}
               disabled={assigned}
               className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all"
             >
               {assigned ? (
                 <><CheckCircle2 className="mr-2 h-4 w-4" /> Dispatched</>
               ) : (
                 <><Navigation className="mr-2 h-4 w-4" /> Authorize Assignment</>
               )}
             </Button>
           </div>
         ) : (
           <div className="text-center opacity-50 flex flex-col items-center">
             <UserCheck className="h-12 w-12 mb-4 text-primary" />
             <p className="font-black text-xs uppercase tracking-widest text-foreground">Awaiting Selection</p>
             <p className="text-[10px] font-bold text-muted-foreground mt-2 max-w-[200px]">Select a fleet unit and available personnel to initiate protocol.</p>
           </div>
         )}
      </div>

      <div className="lg:col-span-1 border border-primary/5 bg-card/40 rounded-2xl shadow-sm p-5 space-y-4">
        <h3 className="font-black text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-emerald-500" /> Available Personnel
        </h3>
        <div className="space-y-3">
          {mockDrivers.map((driver) => (
            <button
              key={driver.id}
              onClick={() => setSelectedDriver(driver.id)}
              disabled={driver.status === "On Duty"}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-300",
                selectedDriver === driver.id 
                  ? "bg-secondary border-foreground/10 shadow-md"
                  : "bg-muted/20 border-transparent hover:bg-muted/40 hover:border-foreground/10",
                driver.status === "On Duty" && "opacity-40 cursor-not-allowed grayscale"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-black text-sm text-foreground">{driver.name}</span>
                <Badge variant="outline" className={cn("text-[9px] uppercase px-2 py-0", driver.status === "Available" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-muted-foreground")}>
                  {driver.status}
                </Badge>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">ID: {driver.id} • Rating: {driver.rating}⭐</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
