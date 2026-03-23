"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navigation, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TransitRoute } from "../types";

interface RoutesTableProps {
  routes: TransitRoute[];
}

export const RoutesTable = ({ routes }: RoutesTableProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md shadow-sm overflow-hidden"
    >
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Path ID</TableHead>
            <TableHead>Route Identity</TableHead>
            <TableHead>Origin / Destination</TableHead>
            <TableHead>Distance Vector</TableHead>
            <TableHead>Stations</TableHead>
            <TableHead>Network State</TableHead>
            <TableHead className="text-right px-8">Audit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id} className="group h-24 hover:bg-white/5 transition-colors border-b last:border-none border-border">
              <TableCell className="px-8 font-black text-xs text-primary tabular-nums">{route.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <span className="font-black text-sm text-foreground">{route.name}</span>
                </div>
              </TableCell>
              <TableCell>
                 <div className="flex flex-col">
                    <span className="font-bold text-xs text-foreground">{route.origin}</span>
                    <span className="text-[10px] font-black text-muted-foreground opacity-60 uppercase">{route.destination}</span>
                 </div>
              </TableCell>
              <TableCell className="font-black text-xs tabular-nums text-foreground">{route.distance}</TableCell>
              <TableCell>
                 <Badge variant="outline" className="rounded-lg h-7 px-3 border-border font-bold text-[10px] text-foreground">
                   {route.stops} Terminals
                 </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn("font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm border-none", 
                  route.status === 'Active' ? "bg-emerald-500/10 text-emerald-600" : 
                  route.status === 'Inactive' ? "bg-amber-500/10 text-amber-600" : 
                  "bg-rose-500/10 text-rose-600"
                )}>
                  {route.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right px-8">
                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical className="h-4 w-4" />
                 </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};
