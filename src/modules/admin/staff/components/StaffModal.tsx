"use client";

import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const StaffModal = ({ onStaffAdded }: { onStaffAdded?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    license_number: "",
    contact_number: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.license_number || !formData.contact_number) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          license_number: formData.license_number.toUpperCase(),
          contact_number: formData.contact_number,
          status: "active",
        })
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setOpen(false);
      setFormData({ first_name: "", last_name: "", license_number: "", contact_number: "" });
      if (onStaffAdded) onStaffAdded();
    } catch (err: any) {
      console.error("Error registering driver:", err);
      alert("Failed to register driver: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground text-xs uppercase tracking-widest">
          <Plus className="h-4 w-4" />
          Register Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-primary/5 text-card-foreground/50 rounded-2xl bg-background/80 backdrop-blur-2xl shadow-2xl">
         <form onSubmit={handleSubmit} className="p-10 bg-gradient-to-br from-primary/10 dark:from-primary/20 via-transparent to-transparent">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Driver Onboarding</DialogTitle>
              <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-2">
                 Initialize new driver credentials and operation logs.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 text-foreground">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">First Name</Label>
                  <Input 
                    placeholder="e.g. Juan" 
                    className="h-12 bg-muted/50 border-primary/5 text-card-foreground focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" 
                    value={formData.first_name}
                    onChange={e => setFormData({...formData, first_name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Last Name</Label>
                  <Input 
                    placeholder="e.g. Luna" 
                    className="h-12 bg-muted/50 border-primary/5 text-card-foreground focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" 
                    value={formData.last_name}
                    onChange={e => setFormData({...formData, last_name: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="col-span-2 space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">License Number</Label>
                    <Input 
                      placeholder="N01-XX-XXXXXX" 
                      className="h-12 bg-muted/50 border-primary/5 text-card-foreground focus-visible:ring-primary/30 rounded-xl font-bold text-foreground uppercase" 
                      value={formData.license_number}
                      onChange={e => setFormData({...formData, license_number: e.target.value})}
                      required
                    />
                 </div>
                 <div className="col-span-2 space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Contact Signal</Label>
                    <Input 
                      placeholder="+63 9xx xxx xxxx" 
                      className="h-12 bg-muted/50 border-primary/5 text-card-foreground focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" 
                      value={formData.contact_number}
                      onChange={e => setFormData({...formData, contact_number: e.target.value})}
                      required
                    />
                 </div>
              </div>
            </div>
            <DialogFooter className="mt-8">
              <Button disabled={loading} type="submit" className="h-14 w-full font-black text-xs uppercase tracking-widest rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary-foreground/10 bg-primary text-primary-foreground border-none">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? "Authorizing..." : "Authorize Access"}
              </Button>
            </DialogFooter>
         </form>
      </DialogContent>
    </Dialog>
  );
};
