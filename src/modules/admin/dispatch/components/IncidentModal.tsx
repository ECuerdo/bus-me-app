"use client";

import React, { useState, useEffect } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Route {
  id: string;
  name: string;
  status: string;
}

export const IncidentModal = ({ onIncidentAdded }: { onIncidentAdded?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  const [formData, setFormData] = useState({
    route_id: "",
    severity: "low",
    delay_minutes: "15",
    description: "",
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
      if (res.ok) setRoutes(data.filter((r: Route) => r.status === "active"));
    } catch(err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.route_id || !formData.description) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          route_id: formData.route_id,
          severity: formData.severity,
          delay_minutes: parseInt(formData.delay_minutes),
          description: formData.description,
          reported_by: "System Dispatcher",
          status: "open",
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setOpen(false);
      setFormData({ route_id: "", severity: "low", delay_minutes: "15", description: "" });
      if (onIncidentAdded) onIncidentAdded();
    } catch(err: unknown) {
      alert("Failed to report incident: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4 h-11 rounded-xl bg-orange-500/10 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:bg-orange-500/20 transition-all flex items-center justify-center gap-2">
           <ShieldAlert className="h-4 w-4" /> Broadcast Reroute
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-primary/5 text-card-foreground/50 rounded-2xl bg-background/80 backdrop-blur-2xl shadow-2xl">
         <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tighter text-foreground text-orange-500">Log Traffic Incident</DialogTitle>
            <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">
              Broadcast delays and reroutes to the active fleet grid.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4 text-foreground">
             <div className="space-y-2.5">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Affected Route Vector</Label>
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
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Severity Level</Label>
                  <Select value={formData.severity} onValueChange={(v) => setFormData({...formData, severity: v})}>
                    <SelectTrigger className="h-12 bg-muted/50 border-primary/5 text-card-foreground rounded-xl font-bold">
                      <SelectValue placeholder="Select severity..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/5">
                      <SelectItem value="low">Low (Nominal Delay)</SelectItem>
                      <SelectItem value="medium">Medium (Moderate Traffic)</SelectItem>
                      <SelectItem value="critical">Critical (Standstill / Reroute)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Est. Delay (Minutes)</Label>
                  <Input 
                    type="number"
                    className="h-12 bg-muted/50 border-primary/5 focus-visible:ring-orange-500/30 rounded-xl font-bold text-foreground tabular-nums" 
                    value={formData.delay_minutes}
                    onChange={e => setFormData({...formData, delay_minutes: e.target.value})}
                    required
                  />
                </div>
             </div>

             <div className="space-y-2.5">
                <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Incident Description</Label>
                <Input 
                  placeholder="e.g. Major collision at Exit 4" 
                  className="h-12 bg-muted/50 border-primary/5 focus-visible:ring-orange-500/30 rounded-xl font-bold text-foreground" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
             </div>
          </div>

          <DialogFooter className="mt-8">
            <Button disabled={loading} type="submit" className="h-14 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-orange-500/20 bg-orange-500 hover:bg-orange-600 text-white border-none">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? "Broadcasting..." : "Broadcast Alert to Fleet"}
            </Button>
          </DialogFooter>

         </form>
      </DialogContent>
    </Dialog>
  );
};
