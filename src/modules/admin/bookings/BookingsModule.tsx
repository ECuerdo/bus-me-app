"use client";

import React from "react";
import { 
  Search, 
  Filter,
  Download,
  TrendingUp,
  Package,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from "./hooks/useBookings";
import { BookingStats } from "./components/BookingStats";
import { BookingsTable } from "./components/BookingsTable";
import { CargoTable } from "./components/CargoTable";

export default function BookingsModule() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredBookings, 
    cargo, 
    stats 
  } = useBookings();

  return (
    <div className="space-y-10">
      {/* Executive Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Fiscal Operations
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Revenue <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Auditing <span className="text-foreground font-bold italic">₱1.2M in monthly flow</span> across all commerce channels.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-6 rounded-2xl gap-2 font-black transition-all hover:bg-primary/5 hover:border-primary/20 bg-muted/50 border-primary/5 text-card-foreground text-foreground">
             <Download className="h-4 w-4" />
             Export Ledger
           </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="h-14 w-fit p-1 bg-muted/50 backdrop-blur-xl border border-primary/5 text-card-foreground rounded-2xl mb-8">
            <TabsTrigger value="sales" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
               <TrendingUp className="h-3.5 w-3.5 mr-2" />
               Sales Reports
            </TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
               <History className="h-3.5 w-3.5 mr-2" />
               Booking Management
            </TabsTrigger>
            <TabsTrigger value="waybill" className="rounded-xl px-6 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
               <Package className="h-3.5 w-3.5 mr-2" />
               Waybill & Cargo
            </TabsTrigger>
         </TabsList>

         <TabsContent value="sales" className="space-y-8 mt-0 outline-none">
            <BookingStats stats={stats} />
            
            <div className="p-12 rounded-2xl border border-dashed border-primary/20 bg-primary/5 text-center">
               <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                  <TrendingUp className="h-10 w-10" />
               </div>
               <h3 className="text-2xl font-black tracking-tighter mb-2 text-foreground">Advanced Fiscal Analytics</h3>
               <p className="text-muted-foreground font-medium text-sm max-w-md mx-auto mb-8">
                  Data visualization for seasonal trends and route profitability is currently aggregating.
               </p>
               <Button className="h-12 px-8 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-transform active:scale-95">Generate Quarterly Report</Button>
            </div>
         </TabsContent>

         <TabsContent value="bookings" className="space-y-8 mt-0 outline-none">
            <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground shadow-sm">
               <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    placeholder="Search transactions..." 
                    className="h-11 w-full pl-12 bg-transparent border-none outline-none font-bold text-sm text-foreground placeholder:text-muted-foreground/40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest bg-card/40 border-primary/5 text-card-foreground text-primary">
                  <Filter className="h-4 w-4" />
                  Audit Filter
               </Button>
            </div>

            <BookingsTable bookings={filteredBookings} />
         </TabsContent>

         <TabsContent value="waybill" className="mt-0 outline-none">
            <CargoTable cargo={cargo} />
         </TabsContent>
      </Tabs>
    </div>
  );
}
