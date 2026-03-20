"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Users, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Award,
  Filter,
  Activity,
  UserCheck
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const staff = [
  { id: "S-001", name: "Roberto Cruz", role: "Driver", status: "Active", email: "roberto.c@busme.pro", phone: "+63 912 345 6789", joined: "2023-05-15" },
  { id: "S-002", name: "Antonio Luna", role: "Driver", status: "Active", email: "antonio.l@busme.pro", phone: "+63 912 345 6788", joined: "2023-06-10" },
  { id: "S-003", name: "Maria Clara", role: "Conductor", status: "Active", email: "maria.c@busme.pro", phone: "+63 912 345 6787", joined: "2023-07-01" },
  { id: "S-004", name: "Juan Dela Cruz", role: "Driver", status: "On-Leave", email: "juan.d@busme.pro", phone: "+63 912 345 6786", joined: "2022-11-20" },
  { id: "S-005", name: "Miguel Lopez", role: "Maintenance", status: "Active", email: "miguel.l@busme.pro", phone: "+63 912 345 6785", joined: "2024-01-05" },
];

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

export default function StaffModule() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Human Resources
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Staff <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Maintain high-performance records for <span className="text-foreground font-bold">128 certified</span> personnel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-11 px-6 gap-2 font-black rounded-2xl shadow-[0_10px_25px_rgba(var(--primary),0.3)] transition-all active:scale-95 bg-gradient-to-br from-primary to-primary/80 border-none text-primary-foreground text-xs uppercase tracking-widest">
                <Plus className="h-5 w-5" />
                Onboard Personnel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[2rem] glass">
               <div className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black tracking-tighter">Personnel Certification</DialogTitle>
                  <DialogDescription className="font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                    Enter the legal and operational data for the new staff member.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-8">
                  <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Full Legal Name</Label>
                    <Input placeholder="e.g. Roberto Cruz" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Functional Role</Label>
                      <Select>
                        <SelectTrigger className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-primary/10 font-bold">
                          <SelectItem value="driver">Licensed Driver</SelectItem>
                          <SelectItem value="conductor">Terminal Conductor</SelectItem>
                          <SelectItem value="maintenance">Maintenance Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Contact Hub</Label>
                      <Input placeholder="+63 9XX XXX XXXX" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Label className="text-[10px] uppercase font-black tracking-widest ml-1 text-muted-foreground">Security Email</Label>
                    <Input type="email" placeholder="staff@busme.pro" className="h-12 bg-white/50 border-white/40 focus-visible:ring-primary/30 rounded-xl font-bold" />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="h-12 w-full font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 bg-primary text-primary-foreground border-none">Authorize Personnel</Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-5 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/40 shadow-sm">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search personnel by name or ID..." 
            className="h-11 pl-12 bg-white/40 border-none transition-all focus:bg-white/60 font-bold rounded-2xl shadow-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-bold hover:bg-primary/5 transition-all bg-white/50 border-white/20">
             <UserCheck className="h-4 w-4 text-primary" />
             Availability Filter
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
              <TableHead className="w-[120px] px-8">Audit ID</TableHead>
              <TableHead>Persona</TableHead>
              <TableHead>Functional Class</TableHead>
              <TableHead>Channel Info</TableHead>
              <TableHead>Service Status</TableHead>
              <TableHead className="text-right px-8">Commands</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((person) => (
              <TableRow key={person.id} className="group h-24 hover:bg-white/60 transition-colors border-b last:border-none border-white/20">
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
                   <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
                      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 rounded-xl transition-all">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-white/80 rounded-xl transition-all shadow-none border-none">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px] p-2 rounded-2xl glass border-primary/10 shadow-2xl" sideOffset={10}>
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
      </motion.div>
    </div>
  );
}
