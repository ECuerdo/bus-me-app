"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Bus, MoreVertical, Edit, Trash2, Gauge, ShieldCheck, MapPin, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const buses = [
  { id: "B-101", plate: "ABC-1234", type: "Executive", status: "Active", route: "Manila - Baguio", condition: "Excellent" },
  { id: "B-102", plate: "XYZ-5678", type: "Regular", status: "Maintenance", route: "Pasay - Legazpi", condition: "Fair" },
  { id: "B-103", plate: "LMN-9012", type: "Sleeper", status: "Active", route: "Manila - Vigan", condition: "Excellent" },
  { id: "B-104", plate: "QWE-3456", type: "Executive", status: "Inactive", route: "None", condition: "Critical" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Verified</Badge>;
    case "Maintenance":
      return <Badge className="bg-amber-500/10 text-amber-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Reviewing</Badge>;
    case "Inactive":
      return <Badge className="bg-rose-500/10 text-rose-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Offline</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function FleetModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBuses = buses.filter(bus => 
    bus.plate.toLowerCase().includes(searchTerm.toLowerCase()) || 
    bus.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Asset Management
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Fleet <span className="text-primary italic">Inventory</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Maintaining <span className="text-foreground font-bold">48 operational units</span> across the national network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
                <Plus className="h-5 w-5" />
                Register New Unit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[2rem] glass">
               <div className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black tracking-tighter">New Asset Registration</DialogTitle>
                  <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Enter the operational and legal data for the new fleet unit.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Plate Identifier</Label>
                      <Input placeholder="ABC-1234" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Unit Class</Label>
                      <Input placeholder="Executive" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Default Route Allocation</Label>
                    <Input placeholder="Manila - Baguio" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">Onboard Unit</Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/40 shadow-sm">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search assets by plate or ID..." 
            className="h-11 pl-12 bg-white/40 border-none transition-all focus:bg-white/60 font-bold rounded-2xl shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold hover:bg-primary/5 transition-all bg-white/50 border-white/20">
             <Filter className="h-4 w-4 text-primary" />
             Advanced Filter
           </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-[2.5rem] border border-white/40 bg-white/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-primary/5 h-16">
            <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
              <TableHead className="w-[120px] px-8">Unit ID</TableHead>
              <TableHead>Chassis & Spec</TableHead>
              <TableHead>Route Matrix</TableHead>
              <TableHead>Health Index</TableHead>
              <TableHead>Ops Status</TableHead>
              <TableHead className="text-right px-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuses.map((bus) => (
              <TableRow key={bus.id} className="group h-24 hover:bg-white/60 transition-colors border-b last:border-none border-white/20">
                <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{bus.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-inner transition-transform group-hover:rotate-12 group-hover:scale-110">
                      <Bus className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-foreground">{bus.plate}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{bus.type} Class</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 font-bold text-xs text-foreground bg-primary/5 w-fit px-3 py-1.5 rounded-lg border border-primary/10 group-hover:bg-primary/10 transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {bus.route}
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex flex-col gap-1.5 w-32">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
                        <span>Reliability</span>
                        <span className={cn(bus.condition === 'Excellent' ? "text-emerald-500" : bus.condition === 'Fair' ? "text-amber-500" : "text-rose-500")}>
                          {bus.condition === 'Excellent' ? "98%" : bus.condition === 'Fair' ? "65%" : "20%"}
                        </span>
                     </div>
                     <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-1000", 
                          bus.condition === 'Excellent' ? "w-[98%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : 
                          bus.condition === 'Fair' ? "w-[65%] bg-amber-500" : 
                          "w-[20%] bg-rose-500"
                        )} />
                     </div>
                   </div>
                </TableCell>
                <TableCell>{getStatusBadge(bus.status)}</TableCell>
                <TableCell className="text-right px-8">
                   <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/80 rounded-xl transition-all shadow-none border-none">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-2xl border-primary/10 shadow-2xl glass" sideOffset={10}>
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-2 py-1.5 opacity-60">Fleet Ops</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-primary/5" />
                        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
                          <Gauge className="h-4 w-4 text-primary" />
                          Diagnostic Trace
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          Security Clearance
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-primary/5" />
                        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-black text-xs text-rose-500 focus:bg-rose-500/5 focus:text-rose-600 transition-colors uppercase tracking-widest">
                          <Trash2 className="h-4 w-4" />
                          Decommission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       </div>
      </motion.div>
    </div>
  );
}
