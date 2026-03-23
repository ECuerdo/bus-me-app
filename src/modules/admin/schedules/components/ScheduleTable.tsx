"use client";

import React from "react";
import { Bus, Clock, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TransitSchedule } from "../types";

interface ScheduleTableProps {
  schedules: TransitSchedule[];
}

export const ScheduleTable = ({ schedules }: ScheduleTableProps) => {
  return (
    <div className="rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md shadow-sm overflow-hidden text-foreground">
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Manifest</TableHead>
            <TableHead>Fleet Unit</TableHead>
            <TableHead>Route Matrix</TableHead>
            <TableHead>Time Vector</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead>Operational State</TableHead>
            <TableHead className="text-right px-8">Monitor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((trip) => (
            <TableRow key={trip.id} className="group h-24 hover:bg-primary/5 transition-colors border-b last:border-none border-border">
              <TableCell className="px-8 font-black text-xs text-primary tabular-nums">{trip.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-sm text-foreground">{trip.bus}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider">OP: {trip.driver}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-bold text-xs bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 w-fit text-foreground">
                  {trip.route}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs font-black tracking-tighter text-foreground">
                    <Clock className="h-3 w-3 text-primary" />
                    {trip.departure}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold opacity-60">ETA: {trip.arrival}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-20 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(parseInt(trip.occupancy.split('/')[0]) / parseInt(trip.occupancy.split('/')[1])) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black tabular-nums text-foreground">{trip.occupancy}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={cn("font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm border-none", 
                  trip.status === 'On Travel' ? "bg-emerald-500/10 text-emerald-600" : 
                  trip.status === 'Delayed' ? "bg-rose-500/10 text-rose-600" : 
                  "bg-blue-500/10 text-blue-600"
                )}>
                  {trip.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right px-8">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100 text-foreground">
                  <Info className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
