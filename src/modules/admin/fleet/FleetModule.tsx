"use client";

import React from "react";
import { 
  Bus, 
  Search, 
  Filter,
  Wrench,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFleet } from "./hooks/useFleet";
import { RegisterUnitModal } from "./components/RegisterUnitModal";
import { FleetTable } from "./components/FleetTable";
import { MaintenanceTable } from "./components/MaintenanceTable";
import { MaintenanceStats } from "./components/MaintenanceStats";

export default function FleetModule() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredBuses, 
    maintenanceLogs, 
    stats 
  } = useFleet();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Asset Management
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Fleet <span className="text-primary italic">Inventory</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Maintaining <span className="text-foreground font-bold italic">48 operational units</span> across the national network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RegisterUnitModal />
        </div>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="h-14 w-full justify-start gap-4 bg-muted/20 backdrop-blur-md border border-border p-2 rounded-2xl mb-8">
          <TabsTrigger value="inventory" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
             <Bus className="h-3.5 w-3.5 mr-2" />
             Unit Inventory
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
             <Wrench className="h-3.5 w-3.5 mr-2" />
             Maintenance Logs
          </TabsTrigger>
          <TabsTrigger value="personnel" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
             <UserCheck className="h-3.5 w-3.5 mr-2" />
             Personnel Assignment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-8 mt-0 outline-none">
          <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-card/40 backdrop-blur-md border border-border shadow-sm">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                placeholder="Search assets..." 
                className="h-11 w-full pl-12 bg-transparent border-none outline-none font-bold text-sm text-foreground placeholder:text-muted-foreground/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
               <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all bg-card/40 border-border text-primary">
                 <Filter className="h-4 w-4" />
                 Global Filter
               </Button>
            </div>
          </div>

          <FleetTable buses={filteredBuses} />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-8 mt-0 outline-none">
           <MaintenanceStats stats={stats} />
           <MaintenanceTable logs={maintenanceLogs} />
        </TabsContent>

        <TabsContent value="personnel" className="mt-0 outline-none">
           <div className="flex flex-col items-center justify-center min-h-[400px] rounded-[2.5rem] border border-dashed border-primary/20 bg-primary/5 p-12 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                 <UserCheck className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter text-foreground mb-2">Resource Allocation Protocol</h3>
              <p className="text-muted-foreground font-medium text-sm max-w-md mb-8">
                Select a fleet unit to initiate personnel assignment for the upcoming operational cycle.
              </p>
              <div className="flex gap-4">
                 <Button className="h-12 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-transform active:scale-95">Select Unit</Button>
                 <Button variant="outline" className="h-12 px-8 rounded-2xl border-primary/20 font-black text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors text-foreground">Staff Directory</Button>
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
