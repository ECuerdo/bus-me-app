import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavUser } from "@/app/_components/nav-user";
import { createClient } from "@/utils/supabase/server";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
}

export default async function AdminHeader({ breadcrumbs }: AdminHeaderProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Try to get user profile name
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user?.id)
    .single();

  const userData = {
    name: profile ? `${profile.first_name} ${profile.last_name}` : user?.email?.split('@')[0] || "User",
    email: user?.email || "",
    avatar: "/avatars/admin.png",
  };

  return (
    <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b shadow-sm bg-background/60 backdrop-blur-xl sm:h-16 overflow-hidden px-4">
      <div className="flex h-full min-w-0 items-center gap-2 overflow-hidden">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <Separator orientation="vertical" className="hidden sm:block mr-2 data-[orientation=vertical]:h-4 shrink-0" />
        <div className="min-w-0 overflow-hidden">
          <Breadcrumb>
            <BreadcrumbList className="min-w-0 overflow-hidden">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                   <BreadcrumbItem className={cn(index < breadcrumbs.length - 1 ? "hidden md:block shrink-0" : "min-w-0 overflow-hidden")}>
                    {item.href ? (
                      <BreadcrumbLink href={item.href} className="font-bold text-muted-foreground hover:text-primary transition-colors">
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="truncate max-w-[56vw] sm:max-w-[60vw] md:max-w-none font-black text-primary">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="flex h-full items-center px-2 sm:px-4 shrink-0 max-w-[48vw] sm:max-w-none overflow-hidden text-foreground">
        <NavUser user={userData} />
      </div>
    </header>
  );
}
