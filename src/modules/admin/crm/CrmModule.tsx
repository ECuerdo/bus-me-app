"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ticket, Users, ScanLine, Filter } from "lucide-react";
import { PassengerDirectory } from "./components/PassengerDirectory";
import { TicketTerminal } from "./components/TicketTerminal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CrmModule() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Customer Experience
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Passenger <span className="text-primary italic">CRM & Ticketing</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Managing <span className="text-foreground font-bold italic">4,201 active profiles</span> and unified transit transactions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="h-11 px-6 gap-2 font-black rounded-2xl bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all">
             <ScanLine className="h-4 w-4" />
             Scan Ticket QR
          </Button>
        </div>
      </div>

      <Tabs defaultValue="directory" className="w-full">
         <TabsList className="h-14 w-full justify-start gap-4 bg-muted/20 backdrop-blur-md border border-primary/5 text-card-foreground p-2 rounded-2xl mb-8">
            <TabsTrigger value="directory" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
               <Users className="h-3.5 w-3.5 mr-2" />
               Passenger Directory
            </TabsTrigger>
            <TabsTrigger value="ticketing" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
               <Ticket className="h-3.5 w-3.5 mr-2" />
               Point of Sale (Ticketing)
            </TabsTrigger>
         </TabsList>

         <TabsContent value="directory" className="space-y-8 mt-0 outline-none">
            <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground shadow-sm">
               <div className="flex-1 max-w-md relative">
                 <input 
                   placeholder="Search passenger names, emails, or PNR..." 
                   className="h-11 w-full pl-6 bg-transparent border-none outline-none font-bold text-sm text-foreground placeholder:text-muted-foreground/40"
                 />
               </div>
               <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all bg-card/40 border-primary/5 text-card-foreground text-primary">
                    <Filter className="h-4 w-4" /> Segment Filter
                  </Button>
               </div>
            </div>
            <PassengerDirectory />
         </TabsContent>

         <TabsContent value="ticketing" className="mt-0 outline-none">
            <TicketTerminal />
         </TabsContent>
      </Tabs>
    </div>
  );
}
