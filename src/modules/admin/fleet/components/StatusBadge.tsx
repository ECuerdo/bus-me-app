import React from "react";
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Active":
    case "Completed":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Verified</Badge>;
    case "Maintenance":
    case "Pending":
      return <Badge className="bg-amber-500/10 text-amber-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Process</Badge>;
    case "Inactive":
    case "Scheduled":
      return <Badge className="bg-primary/10 text-primary border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Queued</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
