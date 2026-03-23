"use client";

import React from "react";
import { 
  Download,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAnalytics } from "./hooks/useAnalytics";
import { KPIsGrid } from "./components/KPIsGrid";
import { RevenueVelocity } from "./components/RevenueVelocity";
import { NetworkDistribution } from "./components/NetworkDistribution";

export default function AnalyticsModule() {
  const { 
    performanceData, 
    revenueTimeline, 
    networkDistribution 
  } = useAnalytics();

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Strategic Analytics
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Market <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Synthesizing <span className="text-foreground font-bold italic underline decoration-primary/50 decoration-2">big data patterns</span> for operational excellence.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-6 rounded-2xl gap-2 font-black transition-all hover:bg-primary/5 hover:border-primary/20 bg-muted/50 border-border text-foreground">
             <Calendar className="h-4 w-4" />
             Fiscal Year 2024
           </Button>
           <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
             <Download className="h-4 w-4" />
             Export Matrix
           </Button>
        </div>
      </div>

      {/* Core KPIs */}
      <KPIsGrid metrics={performanceData} />

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Velocity Chart */}
        <RevenueVelocity timeline={revenueTimeline} />

        {/* Global Network Hubs */}
        <NetworkDistribution distribution={networkDistribution} />
      </div>
    </div>
  );
}
