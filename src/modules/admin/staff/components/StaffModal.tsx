"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const StaffModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground text-xs uppercase tracking-widest">
          <Plus className="h-4 w-4" />
          Register Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none rounded-[3rem] glass">
         <div className="p-10 bg-gradient-to-br from-primary/10 dark:from-primary/20 via-transparent to-transparent">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Personnel Onboarding</DialogTitle>
              <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-2">
                 Initialize new staff credentials and operational access levels.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 text-foreground">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Full Name</Label>
                  <Input placeholder="e.g. Juan Luna" className="h-12 bg-muted/50 border-border focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Operational Role</Label>
                  <Select>
                    <SelectTrigger className="h-12 bg-muted/50 border-border rounded-xl font-bold text-foreground">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-border">
                      <SelectItem value="driver">Field Driver</SelectItem>
                      <SelectItem value="conductor">Transit Conductor</SelectItem>
                      <SelectItem value="maintenance">Maintenance Eng.</SelectItem>
                      <SelectItem value="admin">System Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Secure Email</Label>
                    <Input type="email" placeholder="name@busme.pro" className="h-12 bg-muted/50 border-border focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" />
                 </div>
                 <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Contact Signal</Label>
                    <Input placeholder="+63 9xx xxx xxxx" className="h-12 bg-muted/50 border-border focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" />
                 </div>
              </div>
            </div>
            <DialogFooter className="mt-8">
              <Button type="submit" className="h-14 w-full font-black text-xs uppercase tracking-widest rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary-foreground/10 bg-primary text-primary-foreground border-none">Authorize Access</Button>
            </DialogFooter>
         </div>
      </DialogContent>
    </Dialog>
  );
};
