"use client";

import React from "react";
import { Users, Award, Mail, Phone, Edit, MoreVertical, ShieldCheck, Activity, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { StaffMember } from "../types";

interface StaffTableProps {
  staff: StaffMember[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Verified</Badge>;
    case "On-Leave":
      return <Badge className="bg-amber-500/10 text-amber-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Excused</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const StaffTable = ({ staff }: StaffTableProps) => {
  return (
    <div 
      className="rounded-2xl border border-primary/5 bg-card shadow-md overflow-hidden"
    >
      <div className="overflow-x-auto">
        <Table className="min-w-[1100px]">
          <TableHeader className="bg-primary/5 h-16">
            <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
              <TableHead className="w-[120px] px-8">Audit ID</TableHead>
              <TableHead>Persona</TableHead>
              <TableHead>Functional Class</TableHead>
              <TableHead>Channel Info</TableHead>
              <TableHead>Service Status</TableHead>
              <TableHead className="text-right px-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((person) => (
              <TableRow key={person.id} className="group h-24 hover:bg-primary/5 transition-colors border-b last:border-none border-primary/5 text-card-foreground">
                <TableCell className="px-8 font-black text-sm text-primary tracking-tighter tabular-nums">{person.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 rounded-xl shadow-lg ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all group-hover:scale-105">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`} />
                      <AvatarFallback className="font-black text-xs bg-primary/10 text-primary">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-foreground">{person.name}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Joined {person.joined}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-tight text-foreground bg-primary/5 w-fit px-3 py-1.5 rounded-lg border border-primary/10 group-hover:bg-primary/10 transition-colors">
                    {person.role === 'Driver' ? <Award className="h-3.5 w-3.5 text-primary" /> : <Users className="h-3.5 w-3.5 text-primary" />}
                    {person.role}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-foreground lowercase group-hover:text-primary transition-colors">
                      <Mail className="h-3 w-3 text-primary opacity-60" />
                      {person.email}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground tabular-nums">
                      <Phone className="h-3 w-3 text-primary opacity-60" />
                      {person.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(person.status)}</TableCell>
                <TableCell className="text-right px-8">
                   <div className="flex items-center justify-end gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all text-foreground">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all shadow-none border-none text-foreground">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-2xl bg-background/80 backdrop-blur-2xl border-primary/5 text-card-foreground/50 shadow-2xl" sideOffset={10}>
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-2 py-1.5 opacity-60">Staff Ops</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-primary/5" />
                          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            Security Clearance
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
                            <Activity className="h-4 w-4 text-primary" />
                            Performance Metrics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-primary/5" />
                          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-black text-xs text-rose-500 focus:bg-rose-500/5 focus:text-rose-600 transition-colors uppercase tracking-widest">
                            <Trash2 className="h-4 w-4" />
                            Revoke Access
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
    </div>
  );
};
