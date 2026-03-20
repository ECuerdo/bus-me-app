"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Calendar, Clock, Bus, User, MapPin, Edit, Trash2, Filter, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const schedules = [
  { id: "T-801", route: "Manila - Baguio", bus: "B-101", driver: "Roberto Cruz", departure: "08:30 AM", arrival: "01:00 PM", status: "On-Time" },
  { id: "T-802", route: "Pasay - Legazpi", bus: "B-102", driver: "Antonio Luna", departure: "10:15 AM", arrival: "07:30 PM", status: "Delayed" },
  { id: "T-803", route: "Manila - Vigan", bus: "B-103", driver: "Maria Clara", departure: "01:45 PM", arrival: "09:30 PM", status: "Scheduled" },
  { id: "T-804", route: "Davao - Cebu", bus: "B-105", driver: "Juan Dela Cruz", departure: "06:00 PM", arrival: "08:00 AM (Next Day)", status: "Scheduled" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "On-Time":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Verified</Badge>;
    case "Delayed":
      return <Badge className="bg-rose-500/10 text-rose-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Delayed</Badge>;
    case "Scheduled":
      return <Badge className="bg-primary/10 text-primary border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Queued</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function SchedulesModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSchedules = schedules.filter(s => 
    s.route.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Operational Schedule
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Trip <span className="text-primary italic">Configurator</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Managing <span className="text-foreground font-bold">142 active missions</span> for the next 72-hour cycle.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground text-xs uppercase tracking-widest">
                <Plus className="h-4 w-4" />
                Initialize Mission
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[2rem] glass">
               <div className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black tracking-tighter">Mission Initialization</DialogTitle>
                  <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Enter the logistical parameters for the upcoming trip mission.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-8">
                  <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Path Allocation</Label>
                    <Input placeholder="Search route matrix..." className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Unit Assignment</Label>
                      <Input placeholder="Select vehicle..." className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Certified Driver</Label>
                      <Input placeholder="Select personnel..." className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">ETD Source</Label>
                      <Input placeholder="08:30 AM" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">ETA Destination</Label>
                      <Input placeholder="01:00 PM" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">Deploy Mission</Button>
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
            placeholder="Search mission by ID, route, or personnel..." 
            className="h-11 pl-12 bg-white/40 border-none transition-all focus:bg-white/60 font-bold rounded-2xl shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold hover:bg-primary/5 transition-all bg-white/50 border-white/20">
             <Calendar className="h-4 w-4 text-primary" />
             Timeline Filter
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
              <TableHead className="w-[120px] px-8">Mission Code</TableHead>
              <TableHead>Route Matrix</TableHead>
              <TableHead>Resource Allocation</TableHead>
              <TableHead>Timeline Vector</TableHead>
              <TableHead>Execution Status</TableHead>
              <TableHead className="text-right px-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedules.map((trip) => (
              <TableRow key={trip.id} className="group h-24 hover:bg-white/60 transition-colors border-b last:border-none border-white/20">
                <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{trip.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="font-black text-sm text-foreground">{trip.route}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5 px-3 py-2 bg-primary/5 rounded-xl border border-primary/10 group-hover:bg-primary/10 transition-colors w-fit min-w-[160px]">
                    <div className="flex items-center gap-2 text-[11px] font-black text-foreground uppercase tracking-tight">
                       <Bus className="h-3.5 w-3.5 text-primary opacity-60" />
                       Unit {trip.bus}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
                       <User className="h-3.5 w-3.5 text-primary opacity-60" />
                       {trip.driver}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                   <div className="flex flex-col gap-1 group-hover:translate-x-1 transition-transform">
                     <div className="flex items-center gap-2 text-[11px] font-black text-foreground tabular-nums">
                        <Clock className="h-3 w-3 text-emerald-500" />
                        Dep: {trip.departure}
                     </div>
                     <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground tabular-nums">
                        <Activity className="h-3 w-3 text-primary" />
                        Arr: {trip.arrival}
                     </div>
                   </div>
                </TableCell>
                <TableCell>{getStatusBadge(trip.status)}</TableCell>
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
