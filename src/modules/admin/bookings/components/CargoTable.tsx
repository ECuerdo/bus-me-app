"use client";

import React from "react";
import { ArrowRight, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CargoItem } from "../types";
import { StatusBadge } from "./StatusBadge";

interface CargoTableProps {
  cargo: CargoItem[];
}

export const CargoTable = ({ cargo }: CargoTableProps) => {
  return (
    <div className="rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Waybill ID</TableHead>
            <TableHead>Entities (S/R)</TableHead>
            <TableHead>Cargo Profile</TableHead>
            <TableHead>Net Fee</TableHead>
            <TableHead>Execution State</TableHead>
            <TableHead className="text-right px-8">Commands</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cargo.map((item) => (
            <TableRow key={item.id} className="group h-24 hover:bg-white/5 transition-colors border-b last:border-none border-border">
              <TableCell className="px-8 font-black text-xs text-primary tabular-nums">{item.id}</TableCell>
              <TableCell>
                <div className="flex flex-col text-foreground">
                  <span className="font-black text-sm tracking-tight">{item.sender}</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase opacity-60">
                    <ArrowRight className="h-2 w-2" />
                    {item.receiver}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5 text-foreground">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-xs uppercase tracking-tight">{item.type}</span>
                    <span className="text-[10px] font-bold text-muted-foreground opacity-60">{item.wt}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-black text-sm tabular-nums text-foreground">{item.fee}</TableCell>
              <TableCell><StatusBadge status={item.status} /></TableCell>
              <TableCell className="text-right px-8">
                <Button variant="outline" className="h-9 px-4 rounded-xl border-primary/20 text-primary font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Track Hub</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
