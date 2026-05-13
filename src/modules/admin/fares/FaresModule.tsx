"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Banknote, History, ExternalLink } from "lucide-react";
import { FareMatrix } from "./components/FareMatrix";
import { FareModal } from "./components/FareModal";

export default function FaresModule() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Revenue Engineering
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Fare <span className="text-emerald-500 italic">Matrix</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Dynamic pricing engine managing <span className="text-foreground font-bold italic">14 base tariffs</span> across the national grid.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 gap-2 font-black rounded-2xl border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/5 transition-all">
             <History className="h-4 w-4" />
             Pricing History
          </Button>
          <FareModal />
        </div>
      </div>

      <FareMatrix />
    </div>
  );
}
