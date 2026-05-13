"use client";

import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RegisterUnitModal = ({ onUnitAdded }: { onUnitAdded?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    plate_number: "",
    capacity: "",
    model: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.plate_number || !formData.model || !formData.capacity) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/buses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plate_number: formData.plate_number.toUpperCase(),
          model: formData.model,
          capacity: parseInt(formData.capacity, 10),
          status: "available",
        })
      });
      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error);

      setOpen(false);
      setFormData({ plate_number: "", capacity: "", model: "" });
      if (onUnitAdded) onUnitAdded();
    } catch (err: unknown) {
      console.error("Error registering unit:", err);
      alert("Failed to register unit: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <Plus className="h-5 w-5" />
          Register New Unit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-primary/5 text-card-foreground/50 rounded-2xl bg-background/80 backdrop-blur-2xl shadow-2xl">
         <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-br from-primary/10 dark:from-primary/20 via-transparent to-transparent">
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
                <Input 
                  placeholder="ABC-1234" 
                  className="h-12 bg-muted/20 border-primary/5 text-card-foreground/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background uppercase" 
                  value={formData.plate_number}
                  onChange={e => setFormData({...formData, plate_number: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2.5">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Capacity (Seats)</Label>
                <Input 
                  type="number" 
                  placeholder="45" 
                  className="h-12 bg-muted/20 border-primary/5 text-card-foreground/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background" 
                  value={formData.capacity}
                  onChange={e => setFormData({...formData, capacity: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2 space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Chassis / Model Name</Label>
                  <Input 
                    placeholder="e.g. Higer 2024 / Yutong Executive" 
                    className="h-12 bg-muted/20 border-primary/5 text-card-foreground/50 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background" 
                    value={formData.model}
                    onChange={e => setFormData({...formData, model: e.target.value})}
                    required
                  />
               </div>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button disabled={loading} type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? "Registering..." : "Onboard Unit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
