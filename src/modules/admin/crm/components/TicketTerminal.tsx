"use client";

import React, { useState, useEffect } from "react";
import { Ticket, QrCode, CreditCard, UserPlus, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TicketTerminal = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    schedule_id: "",
    fare_category: "regular",
    seat_number: "",
  });

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const res = await fetch("/api/admin/schedules");
      const data = await res.json();
      if (res.ok) {
        setSchedules(data.filter((s:any) => s.status === 'scheduled'));
      }
    } catch(err) {
      console.error("Error loading schedules:", err);
    }
  };

  const processTicket = async () => {
    if (!formData.schedule_id) return alert("Select a schedule first.");
    setLoading(true);

    const ref = "BK-" + Math.floor(1000 + Math.random() * 9000); 
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_ref: ref,
          schedule_id: formData.schedule_id,
          seat_number: formData.seat_number || "Open",
          fare_category: formData.fare_category,
          amount_paid: formData.fare_category === "regular" ? 50 : 40,
          payment_method: "CASH",
          payment_status: "completed"
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      alert(`Ticket Issued Successfully! Reference: ${ref}`);
      setFormData({ schedule_id: "", fare_category: "regular", seat_number: "" });
    } catch(err: any) {
      alert("Error issuing ticket: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
       <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-card border border-primary/5 shadow-md flex flex-col gap-8">
             <div>
                <h3 className="font-black text-xl tracking-tighter text-foreground flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" /> Issue Manual Ticket
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Walk-in commuter processing</p>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Select Schedule</Label>
                   <Select value={formData.schedule_id} onValueChange={(v) => setFormData({...formData, schedule_id: v})}>
                     <SelectTrigger className="h-12 bg-muted/30 border-primary/5 text-card-foreground rounded-xl font-bold">
                       <SelectValue placeholder="Select active schedule" />
                     </SelectTrigger>
                     <SelectContent className="rounded-xl border-primary/5">
                       {schedules.map(s => (
                         <SelectItem key={s.id} value={s.id}>
                           {s.routes?.name} @ {new Date(s.departure_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Tariff Category</Label>
                   <Select value={formData.fare_category} onValueChange={(v) => setFormData({...formData, fare_category: v})}>
                     <SelectTrigger className="h-12 bg-muted/30 border-primary/5 text-card-foreground rounded-xl font-bold">
                       <SelectValue placeholder="Regular / Special" />
                     </SelectTrigger>
                     <SelectContent className="rounded-xl border-primary/5">
                       <SelectItem value="regular">Regular Passenger</SelectItem>
                       <SelectItem value="student">Student/Senior (20% OFF)</SelectItem>
                       <SelectItem value="pwd">PWD (20% OFF)</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Passenger Connect ID (Optional)</Label>
                   <Input placeholder="PNR-XXXX / Phone" className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold shadow-inner" />
                </div>
                <div className="space-y-2.5">
                   <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Seat Preference (Optional)</Label>
                   <Input 
                      placeholder="e.g. 12A" 
                      className="h-12 bg-muted/30 border-primary/5 focus-visible:ring-primary/30 rounded-xl font-bold shadow-inner" 
                      value={formData.seat_number}
                      onChange={(e) => setFormData({...formData, seat_number: e.target.value})}
                   />
                </div>
             </div>

             <div className="pt-4 flex justify-end gap-3 border-t border-border/50">
               <Button onClick={() => setFormData({ schedule_id: "", fare_category: "regular", seat_number: "" })} variant="outline" className="h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/5 text-foreground border-primary/20">
                 Clear Terminals
               </Button>
               <Button onClick={processTicket} disabled={loading} className="h-12 px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 bg-primary text-primary-foreground gap-2">
                 {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />} 
                 {loading ? "Processing..." : "Process Payment"}
               </Button>
             </div>
          </div>
       </div>

       <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 border-none shadow-xl text-primary-foreground flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group min-h-[300px]">
             <QrCode className="absolute -right-10 -bottom-10 h-64 w-64 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
             <div className="relative z-10 w-20 h-20 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex flex-col items-center justify-center shadow-lg backdrop-blur-md">
                <QrCode className="h-8 w-8" />
             </div>
             <div className="relative z-10 space-y-1">
                <h3 className="font-black text-2xl tracking-tighter shadow-sm">Ready to Scan</h3>
                <p className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-widest">Digital Boarding Pass Verification</p>
             </div>
             <Button variant="secondary" className="relative z-10 w-full mt-4 h-12 rounded-xl font-black text-xs uppercase tracking-widest bg-primary-foreground text-primary hover:bg-white transition-all shadow-lg">
                Activate Scanner
             </Button>
          </div>
       </div>

    </div>
  );
};
