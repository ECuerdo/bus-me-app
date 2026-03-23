"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DriverPerformance } from "../types";

interface DriverCardProps {
  driver: DriverPerformance;
  index: number;
}

export const DriverCard = ({ driver, index }: DriverCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border shadow-sm flex items-center justify-between group hover:bg-accent/5 transition-all"
    >
       <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 rounded-2xl shadow-xl ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`} />
            <AvatarFallback className="font-black text-primary bg-primary/10">{driver.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
             <div className="flex items-center gap-2">
                <h4 className="font-black text-lg tracking-tight text-foreground">{driver.name}</h4>
                <Badge variant="outline" className={cn("border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5 shadow-sm", 
                  driver.status === 'Elite' ? "bg-primary text-primary-foreground shadow-primary-20" : "bg-primary/10 text-primary border-primary/20"
                )}>
                   {driver.status}
                </Badge>
             </div>
             <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                   <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                   {driver.score} Rating
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                   <Clock className="h-3 w-3 text-primary" />
                   {driver.punctuality} On-Time
                </div>
             </div>
          </div>
       </div>
       <div className="flex items-center gap-6">
          <div className="text-right">
             <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Total Missions</p>
             <p className="font-black text-xl tabular-nums leading-none text-foreground">{driver.trips}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
             <TrendingUp className="h-5 w-5" />
          </Button>
       </div>
    </motion.div>
  );
};
