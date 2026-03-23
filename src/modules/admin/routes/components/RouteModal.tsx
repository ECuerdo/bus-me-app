"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const RouteModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <Plus className="h-5 w-5" />
          Define New Route
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-border/50 rounded-[2.5rem] bg-background/80 backdrop-blur-2xl shadow-2xl">
         <div className="p-10 bg-gradient-to-br from-primary/10 dark:from-primary/20 via-transparent to-transparent">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Route Specification</DialogTitle>
              <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-2">
                Define the geographical and operational parameters for the new transit path.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Route Name</Label>
                  <Input placeholder="Arterial Alpha" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold text-foreground transition-all focus:bg-background" />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Distance (km)</Label>
                  <Input placeholder="246" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold text-foreground transition-all focus:bg-background" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Origin Node</Label>
                    <Input placeholder="Manila" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold text-foreground transition-all focus:bg-background" />
                 </div>
                 <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Destination Node</Label>
                    <Input placeholder="Baguio" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold text-foreground transition-all focus:bg-background" />
                 </div>
              </div>
            </div>
            <DialogFooter className="mt-8">
              <Button type="submit" className="h-14 w-full font-black text-xs uppercase tracking-widest rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary-foreground/10 bg-primary text-primary-foreground border-none">Publish Route</Button>
            </DialogFooter>
         </div>
      </DialogContent>
    </Dialog>
  );
};
