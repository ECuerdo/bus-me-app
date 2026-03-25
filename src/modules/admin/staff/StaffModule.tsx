"use client";

import React from "react";
import { 
  Search, 
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useStaff } from "./hooks/useStaff";
import { StaffModal } from "./components/StaffModal";
import { StaffTable } from "./components/StaffTable";

export default function StaffModule() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredStaff 
  } = useStaff();

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm">
            Human Resources
          </Badge>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Staff <span className="text-primary italic">Intelligence</span></h1>
          <p className="text-muted-foreground font-medium text-sm">
            Maintain high-performance records for <span className="text-foreground font-bold italic">128 certified</span> personnel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StaffModal />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-card/40 backdrop-blur-md border border-primary/5 text-card-foreground shadow-sm">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search personnel by name or ID..." 
            className="h-11 pl-12 bg-muted/30 border-none transition-all focus:bg-accent/5 font-bold rounded-2xl shadow-none text-foreground placeholder:text-muted-foreground/40"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-10 px-4 rounded-xl gap-2 font-black text-[10px] uppercase tracking-widest bg-card/40 border-primary/5 text-card-foreground text-primary transition-all hover:bg-primary/5">
             <UserCheck className="h-4 w-4" />
             Availability Filter
           </Button>
        </div>
      </div>

      <StaffTable staff={filteredStaff} />
    </div>
  );
}
