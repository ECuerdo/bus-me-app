"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2, Save } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";

export const FareModal = ({ onFareAdded }: { onFareAdded?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const supabase = createClient();

  const [formData, setFormData] = useState({
    route_id: "",
    base_fare: "50",
    per_km_rate: "2.50",
    student_discount_pct: "20",
    senior_discount_pct: "20"
  });

  useEffect(() => {
    if (open) {
      loadRoutes();
    }
  }, [open]);

  const loadRoutes = async () => {
    try {
      const res = await fetch("/api/admin/routes");
      const data = await res.json();
      if (res.ok) setRoutes(data.filter((r: any) => r.status === "active"));
    } catch(err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.route_id || !formData.base_fare || !formData.per_km_rate) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/fares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route_id: formData.route_id,
          base_fare: parseFloat(formData.base_fare),
          per_km_rate: parseFloat(formData.per_km_rate),
          student_discount_pct: parseInt(formData.student_discount_pct),
          senior_discount_pct: parseInt(formData.senior_discount_pct),
          status: "active"
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setOpen(false);
      setFormData({ route_id: "", base_fare: "50", per_km_rate: "2.50", student_discount_pct: "20", senior_discount_pct: "20" });
      if (onFareAdded) onFareAdded();
    } catch (err: any) {
      alert("Failed to save fare: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.3)] transition-all">
          <Save className="h-4 w-4" />
          Commit New Tariff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-primary/5 text-card-foreground/50 rounded-2xl bg-background/80 backdrop-blur-2xl shadow-2xl">
         <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tighter text-foreground">Define Base Tariff</DialogTitle>
            <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">
              Establish pricing rules and regulatory discounts for a route.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4 text-foreground">
             <div className="space-y-2.5">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Select Route Vector</Label>
                <Select value={formData.route_id} onValueChange={(v) => setFormData({...formData, route_id: v})}>
                  <SelectTrigger className="h-12 bg-muted/50 border-primary/5 text-card-foreground rounded-xl font-bold">
                    <SelectValue placeholder="Select active route..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-primary/5">
                    {routes.map(r => <SelectItem key={r.id} value={r.id}>{r.name} ({r.id})</SelectItem>)}
                  </SelectContent>
                </Select>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Base Flagdown (₱)</Label>
                  <Input 
                    type="number" step="0.5"
                    className="h-12 bg-muted/50 border-primary/5 focus-visible:ring-emerald-500/30 rounded-xl font-bold text-foreground tabular-nums" 
                    value={formData.base_fare}
                    onChange={e => setFormData({...formData, base_fare: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Per Km Rate (₱)</Label>
                  <Input 
                    type="number" step="0.25"
                    className="h-12 bg-muted/50 border-primary/5 focus-visible:ring-emerald-500/30 rounded-xl font-bold text-foreground tabular-nums" 
                    value={formData.per_km_rate}
                    onChange={e => setFormData({...formData, per_km_rate: e.target.value})}
                    required
                  />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Student Yield Detr. (%)</Label>
                  <Input 
                    type="number" max="100"
                    className="h-12 bg-muted/50 border-primary/5 focus-visible:ring-emerald-500/30 rounded-xl font-bold text-foreground tabular-nums" 
                    value={formData.student_discount_pct}
                    onChange={e => setFormData({...formData, student_discount_pct: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Senior Yield Detr. (%)</Label>
                  <Input 
                    type="number" max="100"
                    className="h-12 bg-muted/50 border-primary/5 focus-visible:ring-emerald-500/30 rounded-xl font-bold text-foreground tabular-nums" 
                    value={formData.senior_discount_pct}
                    onChange={e => setFormData({...formData, senior_discount_pct: e.target.value})}
                    required
                  />
                </div>
             </div>
          </div>

          <DialogFooter className="mt-8">
            <Button disabled={loading} type="submit" className="h-14 w-full font-black text-xs uppercase tracking-widest rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-white border-none">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? "Processing..." : "Commit Matrix Updates"}
            </Button>
          </DialogFooter>

         </form>
      </DialogContent>
    </Dialog>
  );
};
