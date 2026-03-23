"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterUnitModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <Plus className="h-5 w-5" />
          Register New Unit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-border/50 rounded-[2.5rem] bg-background/80 backdrop-blur-2xl shadow-2xl">
         <div className="p-8 bg-gradient-to-br from-primary/10 dark:from-primary/20 via-transparent to-transparent">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter text-foreground">New Asset Registration</DialogTitle>
            <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
              Enter the operational and legal data for the new fleet unit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Plate Identifier</Label>
                <Input placeholder="ABC-1234" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background" />
              </div>
              <div className="space-y-2.5">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Capacity (Seats)</Label>
                <Input type="number" placeholder="45" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Unit Class</Label>
                  <Input placeholder="Executive" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background" />
               </div>
               <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Model Name</Label>
                  <Input placeholder="Higer 2024" className="h-12 bg-muted/20 border-border/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background" />
               </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">Onboard Unit</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
