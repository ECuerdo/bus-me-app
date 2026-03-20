"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MapPin, Edit, Trash2, Route as RouteIcon, TrendingUp, Filter, ArrowRight, Zap } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const routes = [
  { id: "R-501", origin: "Manila City", destination: "Baguio City", distance: "245 km", duration: "4h 30m", fare: "₱750.00", trips: 12 },
  { id: "R-502", origin: "Pasay Terminal", destination: "Legazpi City", distance: "475 km", duration: "9h 15m", fare: "₱920.00", trips: 8 },
  { id: "R-503", origin: "Vigan City", destination: "Manila City", distance: "405 km", duration: "7h 45m", fare: "₱850.00", trips: 6 },
  { id: "R-504", origin: "Davao City", destination: "Cebu City", distance: "780 km", duration: "14h 20m", fare: "₱1,250.00", trips: 4 },
];

export default function RoutesModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutes = routes.filter(route => 
    route.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
    route.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Operational Network
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Route <span className="text-primary italic">Matrix</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Mapping <span className="text-foreground font-bold">24 established paths</span> connecting 12 major hubs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground text-xs uppercase tracking-widest">
                <Plus className="h-4 w-4" />
                Define New Path
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[2rem] glass">
               <div className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black tracking-tighter">Path Definition Intelligence</DialogTitle>
                  <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Enter the logistical coordinates for the new route sequence.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Origin Hub</Label>
                      <Input placeholder="e.g. Manila Terminal" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Destination Hub</Label>
                      <Input placeholder="e.g. Baguio Terminal" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Distance (KM)</Label>
                      <Input placeholder="245" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Est. Time</Label>
                      <Input placeholder="4h 30m" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Base Fare</Label>
                      <Input placeholder="750.00" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">Initialize Path</Button>
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
            placeholder="Search network hub or route label..." 
            className="h-11 pl-12 bg-white/40 border-none transition-all focus:bg-white/60 font-bold rounded-2xl shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold hover:bg-primary/5 transition-all bg-white/50 border-white/20">
             <Filter className="h-4 w-4 text-primary" />
             Coverage Filter
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
              <TableHead className="w-[120px] px-8">Path Code</TableHead>
              <TableHead>Geographic Vector</TableHead>
              <TableHead>Traffic Load</TableHead>
              <TableHead>Logistics Info</TableHead>
              <TableHead>Premium Rate</TableHead>
              <TableHead className="text-right px-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoutes.map((route) => (
              <TableRow key={route.id} className="group h-24 hover:bg-white/60 transition-colors border-b last:border-none border-white/20">
                <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{route.id}</TableCell>
                <TableCell>
                   <div className="flex items-center gap-4">
                     <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                        <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-transparent opacity-30" />
                     </div>
                     <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-foreground">{route.origin}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground animate-pulse" />
                          <span className="font-black text-sm text-primary">{route.destination}</span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Main Arterial Route</span>
                     </div>
                   </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-bold text-xs text-foreground">
                       <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
                       {route.trips} Daily Missions
                    </div>
                    <div className="h-1 w-24 bg-muted/40 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: `${(route.trips / 15) * 100}%` }} />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-foreground">
                      <RouteIcon className="h-3 w-3 text-primary opacity-60" />
                      {route.distance} Transit
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground tabular-nums">
                      <TrendingUp className="h-3 w-3 text-primary opacity-60" />
                      ~ {route.duration}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-black text-lg tracking-tighter text-foreground tabular-nums opacity-80 group-hover:opacity-100 transition-opacity">
                    {route.fare}
                  </span>
                </TableCell>
                <TableCell className="text-right px-8">
                   <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-rose-500/10 rounded-xl transition-all">
                        <Trash2 className="h-4 w-4 text-rose-500" />
                      </Button>
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
