"use client";

import React from "react";
import { Edit2, Calculator, Percent } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockRates = [
  { id: "R-1", route: "Express Gamma", base: 50.00, perKm: 2.50, studentDesc: "20%", seniorDesc: "20%", status: "Active" },
  { id: "R-2", route: "Metro Loop Z", base: 25.00, perKm: 1.75, studentDesc: "20%", seniorDesc: "20%", status: "Active" },
  { id: "R-3", route: "Coastal Run Beta", base: 85.00, perKm: 3.00, studentDesc: "20%", seniorDesc: "20%", status: "Active" },
  { id: "R-4", route: "Arterial Route C", base: 40.00, perKm: 2.00, studentDesc: "20%", seniorDesc: "20%", status: "Draft" },
];

export const FareMatrix = () => {
  return (
    <div className="rounded-2xl border border-primary/5 bg-card shadow-md overflow-hidden">
      <div className="p-6 border-b border-primary/5 bg-muted/20 flex flex-col sm:flex-row justify-between items-center gap-4">
         <div className="flex gap-4 items-center">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
               <Calculator className="h-6 w-6" />
            </div>
            <div>
               <h3 className="font-black tracking-tighter text-lg text-foreground">Base Tariff Configuration</h3>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Calculated dynamically via distance & class</p>
            </div>
         </div>
         <div className="flex bg-background border border-primary/5 rounded-xl p-1 shadow-sm">
            <div className="px-4 py-2 font-black text-xs uppercase tracking-widest text-emerald-600 bg-emerald-500/10 rounded-lg">Regular</div>
            <div className="px-4 py-2 font-bold text-xs uppercase tracking-widest text-muted-foreground hover:bg-muted/50 cursor-pointer rounded-lg transition-colors">Special Runs</div>
         </div>
      </div>

      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Tariff Code</TableHead>
            <TableHead>Route Profile</TableHead>
            <TableHead>Base Flagdown (₱)</TableHead>
            <TableHead>Per Km Rate (₱)</TableHead>
            <TableHead>Yield Deductions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right px-8">Overrides</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockRates.map((rate) => (
            <TableRow key={rate.id} className="group h-24 hover:bg-emerald-500/5 transition-colors border-b last:border-none border-primary/5 text-card-foreground">
              <TableCell className="px-8 font-black text-sm text-emerald-600 tracking-tighter tabular-nums">{rate.id}</TableCell>
              <TableCell>
                 <span className="font-black text-sm text-foreground">{rate.route}</span>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Standard Class</p>
              </TableCell>
              <TableCell className="font-black text-lg tabular-nums">₱{rate.base.toFixed(2)}</TableCell>
              <TableCell className="font-bold text-primary tabular-nums text-sm">+₱{rate.perKm.toFixed(2)}<span className="text-[9px] text-muted-foreground ml-1 uppercase">/km</span></TableCell>
              <TableCell>
                 <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-600 font-bold tabular-nums text-[10px] px-2 py-0"><Percent className="h-3 w-3 mr-1" />{rate.studentDesc}</Badge>
                 </div>
              </TableCell>
              <TableCell>
                 <Badge variant="outline" className={rate.status === "Active" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 font-black text-[9px] uppercase tracking-widest" : "border-amber-500/30 bg-amber-500/10 text-amber-600 font-black text-[9px] uppercase tracking-widest"}>
                    {rate.status}
                 </Badge>
              </TableCell>
              <TableCell className="text-right px-8">
                 <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-emerald-500/10 hover:text-emerald-600 rounded-xl transition-all shadow-none border-none text-foreground opacity-0 group-hover:opacity-100">
                    <Edit2 className="h-4 w-4" />
                 </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
