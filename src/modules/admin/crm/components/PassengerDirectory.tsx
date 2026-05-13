"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Mail, Phone, ExternalLink, Loader2 } from "lucide-react";
import { useCrm } from "../hooks/useCrm";

export const PassengerDirectory = () => {
  const { passengers, isLoading } = useCrm();

  return (
    <div className="rounded-2xl border border-primary/5 bg-card shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-primary/5 h-16">
            <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
              <TableHead className="px-8">Traveler PNR</TableHead>
              <TableHead>Profile Identity</TableHead>
              <TableHead>Contact Vectors</TableHead>
              <TableHead>Loyalty Status</TableHead>
              <TableHead>Lifetime Value</TableHead>
              <TableHead className="text-right px-8">Deep Dive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                 <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                       <Loader2 className="h-5 w-5 animate-spin text-primary" />
                       Loading passenger directory...
                    </div>
                 </TableCell>
              </TableRow>
            )}
            {!isLoading && passengers.length === 0 && (
               <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center font-bold text-muted-foreground uppercase tracking-widest text-xs">
                     No passenger profiles found.
                  </TableCell>
               </TableRow>
            )}
            {!isLoading && passengers.map((user) => (
              <TableRow key={user.id} className="group h-24 hover:bg-primary/5 transition-colors border-b last:border-none border-primary/5 text-card-foreground">
                 <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{user.id}</TableCell>
                 <TableCell>
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10 rounded-full shadow-lg ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all">
                          <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}`} />
                          <AvatarFallback className="font-black text-xs bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div className="flex flex-col">
                          <span className="font-black text-sm text-foreground">{user.name}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{user.rides} Lifetime Rides</span>
                       </div>
                    </div>
                 </TableCell>
                 <TableCell>
                    <div className="flex flex-col gap-1">
                       <div className="flex items-center gap-2 text-[11px] font-bold text-foreground lowercase">
                          <Mail className="h-3 w-3 text-primary opacity-60" /> {user.email}
                       </div>
                       <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground tabular-nums">
                          <Phone className="h-3 w-3 text-primary opacity-60" /> {user.phone}
                       </div>
                    </div>
                 </TableCell>
                 <TableCell>
                    <Badge variant="outline" className={
                       user.status === "Premium" ? "border-amber-500/30 bg-amber-500/10 text-amber-600 font-black text-[9px] uppercase tracking-widest px-2 shadow-sm" :
                       user.status === "Corporate" ? "border-primary/30 bg-primary/10 text-primary font-black text-[9px] uppercase tracking-widest px-2 shadow-sm" :
                       "border-muted bg-muted/20 text-muted-foreground font-black text-[9px] uppercase tracking-widest px-2"
                    }>
                       {user.status}
                    </Badge>
                 </TableCell>
                 <TableCell>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-foreground bg-primary/5 px-3 py-1 rounded-lg w-fit border border-primary/10">
                       <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> {user.rating.toFixed(1)}
                    </div>
                 </TableCell>
                 <TableCell className="text-right px-8">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all text-primary opacity-0 group-hover:opacity-100">
                       <ExternalLink className="h-4 w-4" />
                    </Button>
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
