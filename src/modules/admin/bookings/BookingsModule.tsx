"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Ticket, 
  User, 
  MoreVertical, 
  Eye, 
  Printer, 
  XCircle,
  Clock,
  Filter,
  Download,
  Wallet,
  ArrowRight
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bookings = [
  { id: "BK-9001", passenger: "Maria Santos", tripId: "T-801", seat: "A12", amount: "₱750.00", date: "2024-03-20", status: "Paid", method: "GCash" },
  { id: "BK-9002", passenger: "Pedro Penduko", tripId: "T-801", seat: "A13", amount: "₱750.00", date: "2024-03-20", status: "Paid", method: "Credit Card" },
  { id: "BK-9003", passenger: "Liza Soberano", tripId: "T-802", seat: "B05", amount: "₱920.00", date: "2024-03-20", status: "Pending", method: "Over-the-Counter" },
  { id: "BK-9004", passenger: "Enrique Gil", tripId: "T-802", seat: "B06", amount: "₱920.00", date: "2024-03-21", status: "Paid", method: "Maya" },
  { id: "BK-9005", passenger: "Kathryn Bernardo", tripId: "T-803", seat: "C10", amount: "₱1,150.00", date: "2024-03-21", status: "Cancelled", method: "GCash" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Verified</Badge>;
    case "Pending":
      return <Badge className="bg-amber-500/10 text-amber-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">En-Route</Badge>;
    case "Cancelled":
      return <Badge className="bg-rose-500/10 text-rose-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Revoked</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function BookingsModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(b => 
    b.passenger.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Fiscal Operations
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Booking <span className="text-primary italic">Hub</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Reviewing <span className="text-foreground font-bold">1,204 transactions</span> for the current fiscal period.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-6 rounded-2xl gap-2 font-black transition-all hover:bg-primary/5 hover:border-primary/20 bg-white/50 border-white/20">
             <Download className="h-4 w-4" />
             Export Ledger
           </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/40 shadow-sm">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search transactions by passenger or ID..." 
            className="h-11 pl-12 bg-white/40 border-none transition-all focus:bg-white/60 font-bold rounded-2xl shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold hover:bg-primary/5 transition-all bg-white/50 border-white/20">
             <Filter className="h-4 w-4 text-primary" />
             Audit Filter
           </Button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-[2.5rem] border border-white/40 bg-white/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
          <Table className="min-w-[1100px]">
            <TableHeader className="bg-primary/5 h-16">
            <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
              <TableHead className="w-[140px] px-8">Audit ID</TableHead>
              <TableHead>Principal Account</TableHead>
              <TableHead>Mission Ref</TableHead>
              <TableHead>Net Revenue</TableHead>
              <TableHead>Auth Stamp</TableHead>
              <TableHead>Payment Gateway</TableHead>
              <TableHead className="text-right px-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id} className="group h-24 hover:bg-white/60 transition-colors border-b last:border-none border-white/20">
                <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{booking.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shadow-inner transition-transform group-hover:scale-110">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="font-black text-sm tracking-tight">{booking.passenger}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/10 group-hover:bg-primary/10 transition-colors w-fit">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tight text-foreground">
                      <Ticket className="h-3 w-3 text-primary animate-pulse" />
                      Trip {booking.tripId}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground">
                      <ArrowRight className="h-2.5 w-2.5 opacity-60" />
                      Seat {booking.seat}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-black text-foreground tracking-tighter text-lg tabular-nums group-hover:scale-110 origin-left transition-transform group-hover:text-primary">
                  {booking.amount}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 font-bold text-[11px] tabular-nums text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">
                    <Clock className="h-3 w-3 text-primary" />
                    {booking.date}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    {getStatusBadge(booking.status)}
                    <div className="flex items-center gap-1.5 mt-1 text-[9px] font-black text-muted-foreground ml-0.5 uppercase tracking-tight">
                       <Wallet className="h-2.5 w-2.5 text-primary opacity-60" />
                       {booking.method}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right px-8">
                   <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/80 rounded-xl transition-all shadow-none border-none">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-2xl glass border-primary/10 shadow-2xl" sideOffset={10}>
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-2 py-1.5 opacity-60">Audit Ops</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-primary/5" />
                        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
                          <Eye className="h-4 w-4 text-primary" />
                          Inspect Digital Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
                          <Printer className="h-4 w-4 text-primary" />
                          Legacy Printout
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-primary/5" />
                        <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-black text-xs text-rose-500 focus:bg-rose-500/5 focus:text-rose-600 transition-colors uppercase tracking-widest">
                          <XCircle className="h-4 w-4" />
                          Invalidate Transaction
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       </div>
      </motion.div>
    </div>
  );
}
