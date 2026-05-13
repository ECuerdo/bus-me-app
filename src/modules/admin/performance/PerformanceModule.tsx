"use client";

import React from "react";
import { 
  Award, 
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePerformance } from "./hooks/usePerformance";
import { DriverCard } from "./components/DriverCard";
import { FeedbackStream } from "./components/FeedbackStream";

export default function PerformanceModule() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredDrivers, 
    feedbacks 
  } = usePerformance();

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Operational Excellence
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Driver <span className="text-primary italic">Performance</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Monitoring <span className="text-foreground font-bold italic">safety protocols</span> and <span className="text-foreground font-bold italic">service quality</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
             <Award className="h-4 w-4" />
             Reward Top Performers
           </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Performance Scorecards */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black tracking-tighter text-foreground">Tactical Scorecards</h2>
              <div className="flex gap-2">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input 
                      placeholder="Find driver..." 
                      className="h-9 w-48 pl-9 bg-muted/50 border-primary/5 text-card-foreground rounded-xl text-xs font-bold text-foreground placeholder:text-muted-foreground/40"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>
           </div>
           
           <div className="grid gap-4">
              {filteredDrivers.map((driver, i) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
           </div>
        </div>

        {/* Real-time Feedback Stream */}
        <FeedbackStream feedbacks={feedbacks} />
      </div>
    </div>
  );
}
