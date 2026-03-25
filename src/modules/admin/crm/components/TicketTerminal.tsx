"use client";

import React from "react";
import { Ticket, QrCode, CreditCard, UserPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TicketTerminal = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
       <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-card border border-primary/5 shadow-md flex flex-col gap-8">
             <div>
                <h3 className="font-black text-xl tracking-tighter text-foreground flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" /> Issue Manual Ticket
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Walk-in commuter processing</p>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Select Route</Label>
                   <Select>
                     <SelectTrigger className="h-12 bg-muted/30 border-primary/5 text-card-foreground rounded-xl font-bold">
                       <SelectValue placeholder="Select active route" />
                     </SelectTrigger>
                     <SelectContent className="rounded-xl border-primary/5">
                       <SelectItem value="arterial-c">Arterial Route C (₱40)</SelectItem>
                       <SelectItem value="coastal-b">Coastal Run Beta (₱85)</SelectItem>
                       <SelectItem value="express-g">Express Gamma (₱50)</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Tariff Category</Label>
                   <Select>
                     <SelectTrigger className="h-12 bg-muted/30 border-primary/5 text-card-foreground rounded-xl font-bold">
                       <SelectValue placeholder="Regular / Special" />
                     </SelectTrigger>
                     <SelectContent className="rounded-xl border-primary/5">
                       <SelectItem value="regular">Regular Passenger</SelectItem>
                       <SelectItem value="student">Student/Senior (20% OFF)</SelectItem>
                       <SelectItem value="pwd">PWD (20% OFF)</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Passenger Connect ID (Optional)</Label>
                   <Input placeholder="PNR-XXXX / Phone" className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold shadow-inner" />
                </div>
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Seat Preference (Optional)</Label>
                   <Input placeholder="e.g. 12A" className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold shadow-inner" />
                </div>
             </div>

             <div className="pt-4 flex justify-end gap-3 border-t border-border/50">
               <Button variant="outline" className="h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/5 text-foreground border-primary/20">
                 Clear Terminals
               </Button>
               <Button className="h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 bg-primary text-primary-foreground gap-2">
                 <CreditCard className="h-4 w-4" /> Process Payment
               </Button>
             </div>
          </div>
       </div>

       <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 border-none shadow-xl text-primary-foreground flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group min-h-[300px]">
             <QrCode className="absolute -right-10 -bottom-10 h-64 w-64 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
             <div className="relative z-10 w-20 h-20 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex flex-col items-center justify-center shadow-lg backdrop-blur-md">
                <QrCode className="h-8 w-8" />
             </div>
             <div className="relative z-10 space-y-1">
                <h3 className="font-black text-2xl tracking-tighter shadow-sm">Ready to Scan</h3>
                <p className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-widest">Digital Boarding Pass Verification</p>
             </div>
             <Button variant="secondary" className="relative z-10 w-full mt-4 h-12 rounded-xl font-black text-xs uppercase tracking-widest bg-primary-foreground text-primary hover:bg-white transition-all shadow-lg">
                Activate Scanner
             </Button>
          </div>
       </div>

    </div>
  );
};
