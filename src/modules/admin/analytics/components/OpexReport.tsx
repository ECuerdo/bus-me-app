"use client";

import React from "react";
import { TrendingUp, Banknote, Users } from "lucide-react";

export const OpexReport = () => {
  return (
    <div className="col-span-full xl:col-span-3 rounded-[2rem] border border-primary/5 bg-card/40 backdrop-blur-md p-6 lg:p-8 flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-foreground">OPEX vs. Ridership</h3>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Operational Cost Efficiency</p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
          <TrendingUp className="h-6 w-6" />
        </div>
      </div>

      <div className="flex-1 min-h-[250px] flex items-end gap-2 mt-4 relative">
         <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-border/50 -z-10"></div>
         <div className="absolute inset-x-0 top-0 border-t border-dashed border-border/50 -z-10"></div>
         
         {/* Simple CSS Bar Chart Mockup */}
         {[40, 65, 55, 80, 75, 95, 85].map((val, i) => (
           <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group relative">
              <div 
                 style={{ height: `${val}%` }} 
                 className="w-full bg-amber-500/80 rounded-t-lg group-hover:bg-amber-400 transition-all cursor-pointer relative"
              >
                  {/* Revenue / Ridership Bar Overlay */}
                  <div 
                     style={{ height: `${val * 0.7}%` }} 
                     className="absolute bottom-0 inset-x-0 bg-primary/90 rounded-sm"
                  />
              </div>
              <div className="text-center text-[9px] font-black uppercase text-muted-foreground mt-2">
                 M{i+1}
              </div>
           </div>
         ))}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-primary/5">
        <div className="flex items-center gap-2">
           <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex gap-1 items-center"><Banknote className="h-3 w-3" /> Cost (OPEX)</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="h-3 w-3 rounded-full bg-primary/90"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex gap-1 items-center"><Users className="h-3 w-3" /> Ridership Return</span>
        </div>
      </div>
    </div>
  );
};
