"use client";

import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserFeedback } from "../types";

interface FeedbackStreamProps {
  feedbacks: UserFeedback[];
}

export const FeedbackStream = ({ feedbacks }: FeedbackStreamProps) => {
  return (
    <div className="p-8 rounded-[3rem] bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground shadow-sm space-y-6">
       <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black tracking-tighter text-foreground">Feedback Flow</h3>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
       </div>

       <div className="space-y-6">
          {feedbacks.map((fb, i) => (
            <div key={i} className="space-y-3 relative group">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className="font-black text-xs text-foreground">{fb.user}</span>
                     <span className="text-[10px] font-bold text-muted-foreground opacity-60">via App</span>
                  </div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase opacity-40">{fb.date}</span>
               </div>
               <div className="p-4 rounded-2xl bg-muted/50 border border-primary/5 text-card-foreground shadow-inner group-hover:border-primary/20 transition-colors">
                  <div className="flex gap-1 mb-2">
                     {[...Array(5)].map((_, star) => (
                       <Star key={star} className={cn("h-3 w-3", star < fb.rating ? "text-amber-500 fill-amber-500" : "text-muted/30")} />
                     ))}
                  </div>
                  <p className="text-xs font-medium text-foreground leading-relaxed italic">&quot;{fb.comment}&quot;</p>
                  <div className="mt-3 pt-3 border-t border-primary/5 text-card-foreground flex items-center justify-between">
                     <span className="text-[9px] font-black uppercase text-primary tracking-widest">FOR: {fb.driver}</span>
                     <Button variant="ghost" size="sm" className="h-6 px-3 rounded-lg text-[9px] font-black transition-all hover:bg-primary/10 text-foreground">Respond</Button>
                  </div>
               </div>
            </div>
          ))}
       </div>
       
       <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-primary/20 text-primary transition-all hover:bg-primary/5">View Cloud Archives</Button>
    </div>
  );
};
