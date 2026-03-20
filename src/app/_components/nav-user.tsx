"use client"

import {
  BadgeCheck,
  Bell,
  LogOut,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-fit gap-2 px-2 hover:bg-primary/5 rounded-xl transition-all border-none shadow-none focus-visible:ring-0">
          <Avatar className="h-8 w-8 rounded-lg shadow-sm">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-black tracking-tight text-foreground uppercase">{user.name}</span>
            <span className="truncate text-[10px] font-bold text-muted-foreground">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-0.5 size-3.5 text-muted-foreground opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-2xl glass border-primary/10 shadow-2xl"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg shadow-sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-black tracking-tight text-foreground uppercase">{user.name}</span>
              <span className="truncate text-[10px] font-bold text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/5" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
            <Sparkles className="h-4 w-4 text-primary" />
            Vibrant Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary/5" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Security Matrix
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-bold text-xs focus:bg-primary/10 transition-colors">
            <Bell className="h-4 w-4 text-primary" />
            Signal Center
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary/5" />
        <div className="p-1">
          <DropdownMenuItem className="cursor-pointer gap-2.5 rounded-xl h-10 font-black text-xs text-rose-500 focus:bg-rose-500/5 focus:text-rose-600 transition-colors uppercase tracking-widest">
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
