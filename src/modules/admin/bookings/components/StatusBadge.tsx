import React from "react";
import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Paid":
    case "Ready":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Verified</Badge>;
    case "Pending":
    case "In Transit":
      return <Badge className="bg-amber-500/10 text-amber-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Active</Badge>;
    case "Cancelled":
      return <Badge className="bg-rose-500/10 text-rose-600 border-none font-black tracking-widest uppercase text-[9px] px-2.5 py-0.5 shadow-sm">Revoked</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
