"use client"

import {
  Bus,
  LayoutDashboard,
  Map,
  Calendar,
  Ticket,
  Users,
  Settings,
  ShieldCheck,
  Star,
  LogOut,
  BarChart3,
  RadioTower,
  Siren,
  Banknote,
  CloudSun,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Operational Intelligence",
    items: [
      { icon: LayoutDashboard, label: "Live Overview", href: "/admin" },
      { icon: RadioTower, label: "Live Dispatch", href: "/admin/dispatch" },
      { icon: CloudSun, label: "Live Weather", href: "/admin/weather" },
    ],
  },
  {
    label: "Fleet & Resource Management",
    items: [
      { icon: Bus, label: "Unit Inventory", href: "/admin/fleet" },
      { icon: Users, label: "Staff Records", href: "/admin/staff" },
    ],
  },
  {
    label: "Mission Logistics",
    items: [
      { icon: Map, label: "Route Network", href: "/admin/routes" },
      { icon: Calendar, label: "Trip Scheduling", href: "/admin/schedules" },
    ],
  },
  {
    label: "Fiscal Operations",
    items: [
      { icon: Ticket, label: "Revenue Hub", href: "/admin/bookings" },
      { icon: Banknote, label: "Fare Matrix", href: "/admin/fares" },
    ],
  },
  {
    label: "Customer Experience",
    items: [
      { icon: Users, label: "Passenger CRM", href: "/admin/crm" },
    ],
  },
  {
    label: "Strategic Analytics",
    items: [
      { icon: BarChart3, label: "Market Intelligence", href: "/admin/analytics" },
      { icon: Star, label: "Driver Performance", href: "/admin/performance" },
      { icon: ShieldCheck, label: "Safety & Compliance", href: "/admin/compliance" },
      { icon: Siren, label: "Incident Command", href: "/admin/incidents" },
    ],
  },
]

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const res = await fetch("/api/logout", { method: "POST" })
      if (res.ok) {
        toast.success("Session terminated")
        router.refresh()
        router.push("/")
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      toast.error("Failed to terminate session")
      console.error(error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-border/50 bg-card/60 backdrop-blur-2xl" {...props}>
      <SidebarHeader className="h-20 flex flex-row items-center px-4 group-data-[collapsible=icon]:px-1.5 transition-all duration-300">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 group-data-[collapsible=icon]:mx-auto transition-all duration-300">
            <Bus className="h-6 w-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden whitespace-nowrap">
            <span className="text-xl font-black tracking-tighter text-foreground leading-none">BusMe</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-2">
        {navGroups.map((group, idx) => (
          <SidebarGroup key={group.label} className={cn(idx > 0 && "mt-2")}>
            <SidebarGroupLabel className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 group-data-[collapsible=icon]:hidden">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                      className={cn(
                        "h-10 rounded-xl transition-all duration-500",
                        pathname === item.href
                          ? "bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-sm border border-primary/20"
                          : "hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={cn("size-4 shrink-0 transition-transform group-hover:scale-110", pathname === item.href ? "text-primary" : "text-muted-foreground")} />
                        <span className={cn("font-bold tracking-tight text-xs group-data-[collapsible=icon]:hidden", pathname === item.href ? "text-primary" : "text-muted-foreground/80")}>{item.label}</span>
                        {pathname === item.href && (
                          <div className="ml-auto w-1 h-4 rounded-full bg-primary group-data-[collapsible=icon]:hidden" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 group-data-[collapsible=icon]:hidden">
            System
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin/settings"}
                tooltip="Settings"
                className={cn(
                  "h-10 rounded-xl transition-all duration-500",
                  pathname === "/admin/settings"
                    ? "bg-gradient-to-br from-primary/15 to-primary/5 text-primary border border-primary/20"
                    : "hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Link href="/admin/settings" className={cn("flex items-center", "group-data-[collapsible=icon]:justify-center", "gap-3 group-data-[collapsible=icon]:gap-0")}>
                  <Settings className={cn("size-4 shrink-0", pathname === "/admin/settings" ? "text-primary" : "text-muted-foreground")} />
                  <span className="font-bold tracking-tight text-xs group-data-[collapsible=icon]:hidden whitespace-nowrap">Global Config</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="h-10 rounded-xl group text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 transition-all group-data-[collapsible=icon]:justify-center"
              >
                {isLoggingOut ? <Loader2 className="size-4 shrink-0 animate-spin" /> : <LogOut className="size-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />}
                <span className="font-black text-[10px] uppercase tracking-widest group-data-[collapsible=icon]:hidden whitespace-nowrap">Terminate Session</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="group relative rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 border border-primary/10 overflow-hidden group-data-[collapsible=icon]:hidden">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-3.5 w-3.5 text-primary fill-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Status</span>
          </div>
          <p className="text-[10px] font-bold text-foreground/90 leading-tight">Optimized for Enterprise.</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
