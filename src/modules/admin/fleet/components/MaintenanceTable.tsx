"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MaintenanceLog } from "../types";
import { StatusBadge } from "./StatusBadge";

interface MaintenanceTableProps {
  logs: MaintenanceLog[];
}

export const MaintenanceTable = ({ logs }: MaintenanceTableProps) => {
  return (
    <div 
      className="rounded-2xl border border-primary/5 bg-card shadow-md overflow-hidden text-center"
    >
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Job Code</TableHead>
            <TableHead>Unit Plate</TableHead>
            <TableHead>Technical Action</TableHead>
            <TableHead>Scheduled Alignment</TableHead>
            <TableHead>Compliance Status</TableHead>
            <TableHead>Audit State</TableHead>
            <TableHead className="text-right px-8">Execution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} className="group h-24 hover:bg-primary/5 transition-colors border-b last:border-none border-primary/5 text-card-foreground/10">
               <TableCell className="px-8 font-black text-xs text-primary tabular-nums">{log.id}</TableCell>
               <TableCell className="font-bold text-sm tracking-tight text-foreground">{log.plate}</TableCell>
               <TableCell>
                  <Badge variant="outline" className="rounded-lg py-1 px-3 border-primary/20 bg-primary/5 text-primary font-bold text-[10px] uppercase">{log.action}</Badge>
               </TableCell>
               <TableCell className="font-black text-xs tabular-nums text-muted-foreground">{log.schedule}</TableCell>
               <TableCell>
                  <div className={cn("text-[9px] font-black uppercase tracking-widest", log.cert.includes('Expired') ? "text-rose-500" : "text-emerald-500")}>
                     {log.cert}
                  </div>
               </TableCell>
               <TableCell><StatusBadge status={log.status} /></TableCell>
               <TableCell className="text-right px-8">
                  <Button className="h-9 px-4 rounded-xl bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 transition-all">Start Service</Button>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
