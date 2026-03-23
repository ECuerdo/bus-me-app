"use client";

import React from "react";
import { User, Ticket, Clock, MoreVertical, Eye, Printer, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Booking } from "../types";
import { StatusBadge } from "./StatusBadge";

interface BookingsTableProps {
  bookings: Booking[];
}

export const BookingsTable = ({ bookings }: BookingsTableProps) => {
  return (
    <div className="rounded-[2.5rem] border border-border bg-card/40 backdrop-blur-md shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-primary/5 h-16">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Audit ID</TableHead>
            <TableHead>Principal Account</TableHead>
            <TableHead>Mission Ref</TableHead>
            <TableHead>Net Revenue</TableHead>
            <TableHead>Auth Stamp</TableHead>
            <TableHead>Auth State</TableHead>
            <TableHead className="text-right px-8">Audit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="group h-24 hover:bg-white/5 transition-colors border-b last:border-none border-border">
              <TableCell className="px-8 font-black text-xs text-primary tabular-nums">{booking.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5 text-foreground">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-black text-sm tracking-tight">{booking.passenger}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 px-3 py-1.5 bg-primary/5 rounded-lg border border-primary/10 w-fit">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tight text-foreground">
                    <Ticket className="h-3 w-3 text-primary" />
                    Trip {booking.tripId}
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground">
                    Seat {booking.seat}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-black text-foreground tracking-tighter text-lg tabular-nums">
                {booking.amount}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 font-bold text-[11px] tabular-nums text-muted-foreground uppercase tracking-widest">
                  <Clock className="h-3 w-3 text-primary" />
                  {booking.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1.5">
                  <StatusBadge status={booking.status} />
                  <div className="flex items-center gap-1.5 mt-1 text-[9px] font-black text-muted-foreground opacity-60 uppercase">
                    {booking.method}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right px-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-all text-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[220px] p-2 rounded-2xl glass border-primary/10 shadow-2xl">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-2 py-1.5 opacity-60">Fiscal Oversight</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs">
                      <Eye className="h-4 w-4 text-primary" />
                      Inspect Receipt
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs">
                      <Printer className="h-4 w-4 text-primary" />
                      Re-issue Ticket
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/5" />
                    <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-black text-xs text-rose-500 uppercase tracking-widest">
                      <XCircle className="h-4 w-4" />
                      Process Refund
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
