"use client";

import React from "react";
import { ShieldCheck, UserCog, Lock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const roles = [
  { id: "SYS-ADMIN", title: "Super Administrator", access: "Full Access", users: 3 },
  { id: "DISP-L1", title: "Dispatch Lead", access: "Fleet, Maps, Comms", users: 12 },
  { id: "MNTC-L1", title: "Maintenance Chief", access: "Fleet Health, Repairs", users: 8 },
  { id: "REV-OFF", title: "Revenue Officer", access: "Fares, Analytics", users: 5 },
];

export const UserAccessControl = () => {
  return (
    <div className="rounded-[2rem] border border-primary/5 bg-card shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-6 border-b border-primary/5 bg-muted/20 flex justify-between items-center gap-4">
         <div className="flex gap-4 items-center">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
               <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
               <h3 className="font-black tracking-tighter text-lg text-foreground">Role-Based Access Control (RBAC)</h3>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Manage system privileges & security clearances</p>
            </div>
         </div>
         <Button className="h-10 px-6 gap-2 font-black rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 text-[10px] uppercase tracking-widest transition-all">
            <UserCog className="h-3.5 w-3.5" /> Manage Profiles
         </Button>
      </div>

      <Table>
        <TableHeader className="bg-primary/5 h-14">
          <TableRow className="hover:bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-muted-foreground">
            <TableHead className="px-8">Security Level</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Module Clearance</TableHead>
            <TableHead>Active Assignments</TableHead>
            <TableHead className="text-right px-8">Lockdown Protocol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id} className="group h-20 hover:bg-primary/5 transition-colors border-b last:border-none border-primary/5 text-card-foreground">
              <TableCell className="px-8 font-black text-xs text-primary tracking-tighter tabular-nums">{role.id}</TableCell>
              <TableCell className="font-black text-sm text-foreground">{role.title}</TableCell>
              <TableCell>
                 <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 shadow-sm">
                    {role.access}
                 </Badge>
              </TableCell>
              <TableCell className="font-bold text-muted-foreground text-sm flex gap-2 items-center h-20">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 {role.users} Personnel
              </TableCell>
              <TableCell className="text-right px-8">
                 <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex gap-1 items-center"><Lock className="h-3 w-3" /> MFA Req</span>
                    <Switch defaultChecked={role.id !== "SYS-ADMIN"} disabled={role.id === "SYS-ADMIN"} />
                 </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
