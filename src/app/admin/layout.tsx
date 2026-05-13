import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "@/app/_components/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/app/_components/nav-user";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Try to get user profile name
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, role')
    .eq('id', user?.id)
    .single();

  const userData = {
    name: profile ? `${profile.first_name} ${profile.last_name}` : user?.email?.split('@')[0] || "User",
    email: user?.email || "",
    avatar: "/avatars/admin.png",
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="relative flex min-h-svh flex-1 flex-col bg-background overflow-hidden min-w-0">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-primary/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-secondary/20 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4 opacity-40 pointer-events-none" />
          
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
