"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, Settings2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bus as BusType } from "../types";
import { StatusBadge } from "./StatusBadge";

interface FleetTableProps {
  buses: BusType[];
}

export const FleetTable = ({ buses }: FleetTableProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2.5rem] border border-border/50 bg-card/40 backdrop-blur-md shadow-sm overflow-hidden"
    >
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Unit ID</TableHead>
            <TableHead>Chassis & Model</TableHead>
            <TableHead>Load Profile</TableHead>
            <TableHead>Current Path</TableHead>
            <TableHead>Health Vector</TableHead>
            <TableHead>Ops State</TableHead>
            <TableHead className="text-right px-8">Audit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buses.map((bus) => (
            <TableRow key={bus.id} className="group h-24 hover:bg-primary/5 transition-colors border-b last:border-none border-border/10">
              <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{bus.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-sm text-foreground">{bus.plate}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{bus.model}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                 <div className="flex flex-col">
                    <span className="font-bold text-xs text-foreground">{bus.type} Class</span>
                    <span className="text-[10px] font-black text-muted-foreground opacity-60 uppercase">{bus.capacity} Seats</span>
                 </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 font-bold text-xs text-foreground bg-primary/5 w-fit px-3 py-1.5 rounded-lg border border-primary/10">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {bus.route}
                </div>
              </TableCell>
              <TableCell>
                 <div className="flex flex-col gap-1.5 w-24">
                   <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", 
                         bus.condition === 'Excellent' ? "w-[98%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : 
                         bus.condition === 'Fair' ? "w-[65%] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : 
                         "w-[20%] bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                      )} />
                   </div>
                   <span className="text-[8px] font-black uppercase text-muted-foreground tracking-widest">{bus.condition}</span>
                 </div>
              </TableCell>
              <TableCell><StatusBadge status={bus.status} /></TableCell>
              <TableCell className="text-right px-8">
                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100">
                    <Settings2 className="h-4 w-4" />
                 </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};
