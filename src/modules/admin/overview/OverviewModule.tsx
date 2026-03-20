"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Bus, 
  ShoppingBag, 
  Ticket, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Activity,
  Zap,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Gross Revenue", value: "₱124,500.25", change: "+12.5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", glow: "shadow-emerald-500/20" },
  { label: "Total Bookings", value: "1,204", change: "+8.2%", icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10", glow: "shadow-primary/20" },
  { label: "Active Fleet", value: "42/48 Units", change: "92% Utility", icon: Bus, color: "text-blue-500", bg: "bg-blue-500/10", glow: "shadow-blue-500/20" },
  { label: "System Health", value: "99.9%", change: "Stable", icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-500/10", glow: "shadow-indigo-500/20" },
];

export default function OverviewModule() {
  return (
    <div className="space-y-10">
      {/* Executive Header (Local to Module) */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Command Center
          </Badge>
          <h1 className="text-5xl font-black tracking-tighter text-foreground leading-none">
            Executive <span className="text-primary italic">Intelligence</span>
          </h1>
          <p className="text-muted-foreground font-medium text-sm">
            Operational status: <span className="text-emerald-500 font-bold">Optimal Performance</span>. System verified at 08:30 AM.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
             <Activity className="h-4 w-4" />
             Live Analytics
           </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={cn(
              "card-premium group relative p-6 cursor-pointer border-white/40 shadow-sm rounded-[2rem] bg-card/40 backdrop-blur-md border",
              "before:absolute before:inset-0 before:rounded-[2rem] before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl transition-all duration-500 group-hover:scale-110 shadow-lg", stat.bg, stat.color, stat.glow)}>
                <stat.icon className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="bg-muted/10 border-none font-black text-[10px] tracking-tight py-1 px-2">
                {stat.change}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black tracking-[0.15em] text-muted-foreground/60">{stat.label}</p>
              <h2 className="text-2xl font-black tracking-tighter text-foreground group-hover:translate-x-1 transition-transform tabular-nums">
                {stat.value}
              </h2>
            </div>
            <div className="absolute bottom-6 right-6 w-16 h-8 opacity-20 group-hover:opacity-100 transition-opacity">
               <div className="flex items-end gap-1 h-full">
                  {[40, 70, 45, 90, 60].map((h, idx) => (
                    <div key={idx} style={{ height: `${h}%` }} className={cn("flex-1 rounded-full", stat.bg.replace('/10', ''))} />
                  ))}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 rounded-[2.5rem] border bg-white/40 backdrop-blur-md p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-primary/5 group border-white/40">
           <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tighter">Active Deployments</h3>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Real-time Telemetry Monitor</p>
              </div>
              <Button variant="ghost" className="h-10 px-4 rounded-xl gap-2 font-bold hover:bg-primary/10 hover:text-primary transition-all">
                View Global Network
                <ChevronRight className="h-4 w-4" />
              </Button>
           </div>
           
           <div className="space-y-4">
              {[
                { bus: "B-201", origin: "Manila", dest: "Baguio", status: "In Transit", progress: 65, color: "bg-emerald-500" },
                { bus: "B-155", origin: "Davao", dest: "Cebu", status: "Boarding", progress: 15, color: "bg-blue-500" },
                { bus: "B-402", origin: "Iloilo", dest: "Bacolod", status: "Delayed", progress: 40, color: "bg-rose-500" },
              ].map((trip, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/60 border border-white/20 transition-all hover:scale-[1.01] hover:shadow-lg group/item">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-inner">
                        <Bus className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-sm">{trip.bus}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">{trip.origin} → {trip.dest}</span>
                      </div>
                    </div>
                    <Badge className={cn("font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm border-none", 
                      trip.status === 'In Transit' ? "bg-emerald-500/10 text-emerald-600" : 
                      trip.status === 'Boarding' ? "bg-blue-500/10 text-blue-600" : 
                      "bg-rose-500/10 text-rose-600"
                    )}>
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter text-muted-foreground">
                       <span>Distance Completion</span>
                       <span className="tabular-nums">{trip.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${trip.progress}%` }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className={cn("h-full rounded-full shadow-[0_0_8px_rgba(var(--primary),0.3)]", trip.color)} 
                       />
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-[2.5rem] border bg-gradient-to-br from-primary via-primary to-primary/80 p-8 text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group border-none">
            <div className="absolute top-0 right-0 p-8 opacity-20 transition-transform group-hover:scale-125 duration-700">
               <Zap className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tighter leading-none">Financial Flow</h3>
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest text-primary-foreground/70">Revenue Velocity Analytics</p>
              </div>
              <div className="py-4">
                <span className="text-4xl font-black tracking-tighter leading-none tabular-nums">₱842,100</span>
                <p className="text-xs font-bold opacity-80 mt-2 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  +18% Yield this month
                </p>
              </div>
              <div className="pt-4 border-t border-white/20 space-y-4">
                 {[
                   { label: "Transit Tickets", value: "₱512k", progress: 75 },
                   { label: "Cargo Logistics", value: "₱330k", progress: 45 }
                 ].map((item, i) => (
                   <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold uppercase">
                         <span>{item.label}</span>
                         <span>{item.value}</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white group-hover:bg-accent-foreground/20 transition-colors" style={{ width: `${item.progress}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
