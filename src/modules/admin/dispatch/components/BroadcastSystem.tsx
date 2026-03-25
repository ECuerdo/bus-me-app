"use client";

import React from "react";
import { Mic, Radio, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const BroadcastSystem = () => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-xl border-none flex-shrink-0 relative overflow-hidden group">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
       <Radio className="absolute -right-8 -top-8 h-40 w-40 opacity-10 group-hover:scale-110 transition-transform duration-700" />
       
       <div className="relative z-10 flex flex-col h-full">
         <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 mb-2">
           <Mic className="h-4 w-4" /> Global Comms
         </h3>
         <p className="text-[10px] items-center flex gap-1 font-bold text-primary-foreground/80 uppercase tracking-widest mb-6">
           <Users className="h-3 w-3" /> Reaching 4,201 active passengers
         </p>

         <div className="space-y-4 mt-auto">
            <textarea 
               placeholder="Enter emergency broadcast message..." 
               className="w-full h-24 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-3 text-xs font-bold text-primary-foreground placeholder:text-primary-foreground/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
            />
            <Button className="w-full h-12 bg-primary-foreground text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white shadow-xl hover:shadow-2xl transition-all">
               <Send className="h-4 w-4 mr-2" /> Send Push Notification
            </Button>
         </div>
       </div>
    </div>
  );
};
