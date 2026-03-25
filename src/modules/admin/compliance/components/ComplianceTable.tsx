"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ComplianceRecord } from "../types";

interface ComplianceTableProps {
  records: ComplianceRecord[];
}

export const ComplianceTable = ({ records }: ComplianceTableProps) => {
  return (
    <div className="rounded-2xl border border-primary/5 text-card-foreground bg-card/40 backdrop-blur-md shadow-sm overflow-hidden text-foreground">
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Item</TableHead>
            <TableHead>Fleet Unit</TableHead>
            <TableHead>Authority</TableHead>
            <TableHead>Expiry Node</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right px-8">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, i) => (
            <TableRow key={i} className="group h-20 hover:bg-primary/5 transition-colors border-b last:border-none border-primary/5 text-card-foreground">
              <TableCell className="px-8 font-black text-sm text-foreground">{record.item}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-black text-[10px] border-primary/20 text-primary">{record.unit}</Badge>
              </TableCell>
              <TableCell className="font-bold text-xs text-muted-foreground uppercase opacity-80">{record.authority}</TableCell>
              <TableCell className="font-black text-xs tabular-nums text-foreground">{record.expiry}</TableCell>
              <TableCell>
                <Badge className={cn("font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 border-none shadow-sm", 
                  record.status === 'Valid' ? "bg-emerald-500/10 text-emerald-600" : 
                  record.status === 'Expiring' ? "bg-amber-500/10 text-amber-600" : 
                  "bg-rose-500/10 text-rose-600"
                )}>
                   {record.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right px-8">
                <Button variant="ghost" size="sm" className="h-8 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary/5 text-primary opacity-0 group-hover:opacity-100 transition-all">Renew</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
