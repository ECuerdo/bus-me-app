"use client";

import React, { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MissionModal = ({ onScheduleAdded }: { onScheduleAdded?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    bus_id: "",
    route_id: "",
    driver_id: "",
    departure_time: "",
    estimated_arrival: ""
  });

  useEffect(() => {
    if (open) {
       loadLookups();
    }
  }, [open]);

  const loadLookups = async () => {
    try {
      const [busRes, routeRes, driverRes] = await Promise.all([
        fetch("/api/admin/buses").then(res => res.json()),
        fetch("/api/admin/routes").then(res => res.json()),
        fetch("/api/admin/drivers").then(res => res.json())
      ]);
      setBuses(busRes.filter((b: any) => b.status === "available"));
      setRoutes(routeRes.filter((r: any) => r.status === "active"));
      setDrivers(driverRes.filter((d: any) => d.status === "active"));
    } catch(err) {
      console.error("Error loading lookups:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bus_id || !formData.route_id || !formData.driver_id || !formData.departure_time || !formData.estimated_arrival) return;

    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    const depTime = new Date(`${today}T${formData.departure_time}:00`).toISOString();
    const arrTime = new Date(`${today}T${formData.estimated_arrival}:00`).toISOString();

    try {
       const res = await fetch("/api/admin/schedules", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           bus_id: formData.bus_id,
           route_id: formData.route_id,
           driver_id: formData.driver_id,
           departure_time: depTime,
           estimated_arrival: arrTime,
           status: "scheduled",
         })
       });
       const result = await res.json();
       if (!res.ok) throw new Error(result.error);

       setOpen(false);
       setFormData({ bus_id: "", route_id: "", driver_id: "", departure_time: "", estimated_arrival: "" });
       if (onScheduleAdded) onScheduleAdded();
    } catch (err: any) {
       console.error("Error creating schedule:", err);
       alert("Failed to create schedule: " + err.message);
    } finally {
       setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <Plus className="h-5 w-5" />
          Initialize Mission
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-primary/5 text-card-foreground/50 rounded-2xl bg-background/80 backdrop-blur-2xl shadow-2xl">
         <form onSubmit={handleSubmit}>
         <div className="p-10 bg-gradient-to-br from-primary/10 dark:from-primary/20 via-transparent to-transparent">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Mission Programming</DialogTitle>
              <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-2">
                Configure technical parameters for the new transit operation.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Route Vector</Label>
                  <Select onValueChange={(v) => setFormData({...formData, route_id: v})}>
                    <SelectTrigger className="h-12 bg-muted/50 border-primary/5 text-card-foreground rounded-xl font-bold">
                      <SelectValue placeholder="Select Route..." />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Force Identifier (Bus)</Label>
                  <Select onValueChange={(v) => setFormData({...formData, bus_id: v})}>
                    <SelectTrigger className="h-12 bg-muted/50 border-primary/5 text-card-foreground rounded-xl font-bold">
                      <SelectValue placeholder="Select Unit..." />
                    </SelectTrigger>
                    <SelectContent>
                      {buses.map(b => <SelectItem key={b.id} value={b.id}>{b.plate_number}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Command Officer (Driver)</Label>
                  <Select onValueChange={(v) => setFormData({...formData, driver_id: v})}>
                    <SelectTrigger className="h-12 bg-muted/50 border-primary/5 text-card-foreground rounded-xl font-bold">
                      <SelectValue placeholder="Select Driver..." />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map(d => <SelectItem key={d.id} value={d.id}>{d.first_name} {d.last_name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Deployment Time</Label>
                    <Input 
                      type="time" 
                      className="h-12 bg-muted/50 border-primary/5 text-card-foreground focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" 
                      value={formData.departure_time}
                      onChange={e => setFormData({...formData, departure_time: e.target.value})}
                      required
                    />
                 </div>
                 <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Expected Recovery Time</Label>
                    <Input 
                      type="time" 
                      className="h-12 bg-muted/50 border-primary/5 text-card-foreground focus-visible:ring-primary/30 rounded-xl font-bold text-foreground" 
                      value={formData.estimated_arrival}
                      onChange={e => setFormData({...formData, estimated_arrival: e.target.value})}
                      required
                    />
                 </div>
              </div>
            </div>
            <DialogFooter className="mt-8">
              <Button disabled={loading} type="submit" className="h-14 w-full font-black text-xs uppercase tracking-widest rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary-foreground/10 bg-primary text-primary-foreground border-none">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? "Programming..." : "Commit to Network"}
              </Button>
            </DialogFooter>
         </div>
         </form>
      </DialogContent>
    </Dialog>
  );
};
