"use client";

import React from "react";
import { FileText, Download, AlertTriangle, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const protocols = [
  { id: "SOP-1", title: "Severe Weather Evacuation", type: "PDF Manual", date: "Updated Mar 20, 2026" },
  { id: "SOP-2", title: "Accident & Collision Response", type: "Video Brief", date: "Updated Jan 15, 2026" },
  { id: "SOP-3", title: "Hostile Passenger De-escalation", type: "Interactive", date: "Updated Feb 02, 2026" },
];

export const EmergencyProtocols = () => {
  return (
    <div className="rounded-[2rem] border border-rose-500/10 bg-rose-500/5 shadow-inner overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="p-6 border-b border-rose-500/10 flex justify-between items-center gap-4">
         <div className="flex gap-4 items-center">
            <div className="h-12 w-12 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center animate-pulse">
               <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
               <h3 className="font-black tracking-tighter text-lg text-rose-600">Emergency Protocols (SOPs)</h3>
               <p className="text-[10px] font-bold text-rose-500/80 uppercase tracking-widest">Mandatory safety manuals & drills</p>
            </div>
         </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
         {protocols.map((doc, idx) => (
            <div key={idx} className="bg-background rounded-2xl p-5 border border-border shadow-sm hover:shadow-md hover:border-rose-500/30 transition-all group cursor-pointer flex flex-col justify-between min-h-[160px]">
               <div>
                  <div className="flex justify-between items-start mb-3">
                     <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-rose-500/10 group-hover:text-rose-600 transition-colors">
                        {doc.type.includes('Video') ? <PlayCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                     </div>
                     <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">{doc.id}</span>
                  </div>
                  <h4 className="font-black text-sm text-foreground leading-tight group-hover:text-rose-600 transition-colors">{doc.title}</h4>
               </div>
               <div className="flex items-center justify-between mt-4 border-t border-border pt-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{doc.date}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 rounded-lg">
                     <Download className="h-3.5 w-3.5" />
                  </Button>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
