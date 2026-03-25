"use client";

import React from "react";
import { Link2, CreditCard, Receipt, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const integrations = [
  { id: "INT-1", name: "QuickBooks Enterprise", desc: "Automated fleet accounting & ledger", icon: Receipt, active: true, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "INT-2", name: "GCash Merchant Gateway", desc: "Real-time QR ticket payments", icon: Smartphone, active: true, color: "text-blue-600", bg: "bg-blue-600/10" },
  { id: "INT-3", name: "Maya Business API", desc: "Enterprise card processing", icon: CreditCard, active: false, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "INT-4", name: "Global Telematics GPS", desc: "Hardware tracker data sync", icon: Link2, active: true, color: "text-primary", bg: "bg-primary/10" },
];

export const IntegrationsHub = () => {
  return (
    <div className="rounded-[2rem] border border-primary/5 bg-card shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-700">
      <div className="p-6 border-b border-primary/5 bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="flex gap-4 items-center">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shadow-inner">
               <Link2 className="h-6 w-6" />
            </div>
            <div>
               <h3 className="font-black tracking-tighter text-lg text-foreground">External Integrations API</h3>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Connect third-party accounting & transit systems</p>
            </div>
         </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
         {integrations.map((app) => {
            const Icon = app.icon;
            return (
               <div key={app.id} className="flex items-center gap-5 p-5 rounded-2xl border border-primary/5 bg-background hover:border-primary/20 transition-all shadow-sm group">
                  <div className={`h-14 w-14 rounded-[1.2rem] flex items-center justify-center ${app.bg} ${app.color} shadow-inner group-hover:scale-105 transition-transform`}>
                     <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center mb-1.5">
                        <span className="font-black text-sm text-foreground">{app.name}</span>
                        <Switch defaultChecked={app.active} />
                     </div>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{app.desc}</p>
                  </div>
               </div>
            );
         })}
      </div>
    </div>
  );
};
