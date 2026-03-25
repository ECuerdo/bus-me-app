"use client";

import React from "react";
import { HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ArchiveNode = () => {
  return (
    <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-2xl bg-primary/20 text-primary">
          <HardDrive className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-black tracking-tighter text-foreground">Archive Node</h3>
      </div>
      <p className="text-sm font-medium text-muted-foreground leading-relaxed">Encrypted storage of historical compliance logs and legal documentation.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-card/40 border border-primary/5 text-card-foreground text-center">
          <p className="text-2xl font-black tracking-tighter leading-none text-foreground">1,240</p>
          <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mt-1">Stored Assets</p>
        </div>
        <div className="p-4 rounded-2xl bg-card/40 border border-primary/5 text-card-foreground text-center">
          <p className="text-2xl font-black tracking-tighter leading-none text-foreground">100%</p>
          <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mt-1">Uptime Rate</p>
        </div>
      </div>
      <Button variant="outline" className="w-full h-12 rounded-2xl border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest bg-card/40 transition-all hover:bg-primary/5">Access Archives</Button>
    </div>
  );
};
