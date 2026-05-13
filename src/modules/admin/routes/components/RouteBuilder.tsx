"use client";

import React, { useState } from "react";
import { Plus, MapPin, Navigation, Clock, GripVertical, Trash2, Route, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const mockStops = [
  { id: 1, name: "Main Terminal A", distance: "0 km", time: "0 mins" },
  { id: 2, name: "City Center Hub", distance: "12 km", time: "25 mins" },
];

export const RouteBuilder = ({ onRouteAdded }: { onRouteAdded?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    origin: "",
    destination: "",
    distance_km: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.origin || !formData.destination || !formData.distance_km) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code.toUpperCase(),
          name: formData.name,
          origin: formData.origin,
          destination: formData.destination,
          distance_km: parseFloat(formData.distance_km),
          status: "active",
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setOpen(false);
      setFormData({ code: "", name: "", origin: "", destination: "", distance_km: "" });
      if (onRouteAdded) onRouteAdded();
    } catch (err: unknown) {
      console.error("Error creating route:", err);
      alert("Failed to create route: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground">
          <Route className="h-5 w-5" />
          Construct Route Path
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden border-primary/5 rounded-2xl bg-background/95 backdrop-blur-3xl shadow-2xl">
         <form onSubmit={handleSubmit}>
         <div className="p-8 pb-4 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tighter text-foreground flex items-center gap-3">
               Route Infrastructure Suite <Badge className="bg-primary/20 text-primary hover:bg-primary/30 font-black tracking-widest uppercase text-[9px] shadow-none">BETA</Badge>
            </DialogTitle>
            <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest mt-1">
              Define waypoints, calculate distances, and establish transit corridors.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Route Code</Label>
               <Input 
                 placeholder="e.g. R-1" 
                 value={formData.code}
                 onChange={(e) => setFormData({...formData, code: e.target.value})}
                 className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background shadow-inner uppercase" 
                 required
               />
            </div>
            <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Route Designation (Name)</Label>
               <Input 
                 placeholder="e.g. Express Gamma" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background shadow-inner" 
                 required
               />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
             <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Origin Node</Label>
               <Input 
                 placeholder="e.g. Manila" 
                 value={formData.origin}
                 onChange={(e) => setFormData({...formData, origin: e.target.value})}
                 className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background shadow-inner" 
                 required
               />
             </div>
             <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Destination Node</Label>
               <Input 
                 placeholder="e.g. Baguio" 
                 value={formData.destination}
                 onChange={(e) => setFormData({...formData, destination: e.target.value})}
                 className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background shadow-inner" 
                 required
               />
             </div>
             <div className="space-y-2">
               <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Distance (km)</Label>
               <Input 
                 type="number"
                 placeholder="e.g. 246" 
                 value={formData.distance_km}
                 onChange={(e) => setFormData({...formData, distance_km: e.target.value})}
                 className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold transition-all focus:bg-background shadow-inner" 
                 required
               />
             </div>
          </div>
         </div>

         <div className="px-8 pb-8 space-y-4">
            <div className="flex items-center justify-between mb-2 mt-4">
                <h4 className="font-black text-sm uppercase tracking-widest text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Waypoint Sequence (BETA)
                </h4>
                <Button type="button" variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[10px] uppercase tracking-widest gap-1 border-primary/20 text-primary shadow-sm hover:bg-primary/5">
                  <Plus className="h-3 w-3" /> Add Stop
                </Button>
            </div>

            <div className="space-y-3 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar opacity-50 pointer-events-none">
                {mockStops.map((stop, idx) => (
                   <div key={stop.id} className="group relative flex items-center gap-4 bg-muted/20 border border-primary/5 p-3 rounded-2xl hover:bg-muted/40 hover:border-primary/20 transition-all">
                      <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors p-2 -ml-2">
                         <GripVertical className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-md shadow-primary/20">
                               {idx + 1}
                            </div>
                            <span className="font-black text-sm text-foreground">{stop.name}</span>
                         </div>
                         
                         <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                               <Navigation className="h-3.5 w-3.5 text-primary opacity-70" /> {stop.distance}
                            </div>
                            <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-widest">
                               <Clock className="h-3.5 w-3.5 text-primary opacity-70" /> {stop.time}
                            </div>
                         </div>
                      </div>

                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500/10 hover:text-rose-600 rounded-lg">
                         <Trash2 className="h-4 w-4" />
                      </Button>
                   </div>
                ))}
            </div>
            
            <DialogFooter className="pt-6 border-t border-border mt-4">
              <Button disabled={loading} type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {loading ? "Publishing..." : "Publish Route Infrastructure"}
              </Button>
            </DialogFooter>
         </div>
         </form>
      </DialogContent>
    </Dialog>
  );
};
