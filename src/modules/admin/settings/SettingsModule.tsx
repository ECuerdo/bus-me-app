"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Save, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAccessControl } from "./components/UserAccessControl";
import { EmergencyProtocols } from "./components/EmergencyProtocols";
import { IntegrationsHub } from "./components/IntegrationsHub";

export default function SettingsModule() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Core Infrastructure
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">System <span className="text-primary italic">Configurations</span></h1>
          <p className="text-muted-foreground font-medium text-sm max-w-xl">
            Global parameters, security clearances, and 3rd party API integrations defining the operational behavior of the Enterprise environment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-6 gap-2 font-black rounded-2xl border-rose-500/20 text-rose-500 hover:bg-rose-500/5 transition-all">
             <ServerCrash className="h-4 w-4" />
             Maintenance Mode
          </Button>
          <Button onClick={() => alert("Core system configurations synced with database cluster successfully.")} className="h-11 px-8 gap-2 font-black rounded-[1.5rem] shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground text-xs uppercase tracking-widest">
             <Save className="h-4 w-4" />
             Commit Core Changes
          </Button>
        </div>
      </div>

      <div className="space-y-8">
         <UserAccessControl />
         <IntegrationsHub />
         <EmergencyProtocols />
      </div>
    </div>
  );
}
