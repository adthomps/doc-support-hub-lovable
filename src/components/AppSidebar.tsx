import { useState } from "react"
import { 
  BookOpen, 
  Code, 
  Users, 
  HeadphonesIcon, 
  Search, 
  FileText, 
  MessageCircle,
  Shield,
  Zap,
  Settings
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { useCommandPalette } from "@/hooks/useCommandPalette"

const audienceItems = [
  { title: "Developers", url: "/developers", icon: Code, description: "APIs, SDKs & Integration" },
  { title: "Businesses", url: "/businesses", icon: Users, description: "Merchant guides & operations" },
  { title: "Partners & Resellers", url: "/resellers", icon: Shield, description: "Partner, acquirer & referral" },
]

const supportItems = [
  { title: "FAQ", url: "/faq", icon: MessageCircle },
  { title: "Contact Support", url: "/support", icon: HeadphonesIcon },
  { title: "Status", url: "/status", icon: Zap },
]

const resourceItems = [
  { title: "Getting Started", url: "/getting-started", icon: BookOpen },
  { title: "API Reference", url: "/api", icon: FileText },
  { title: "Changelog", url: "/changelog", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const { setOpen } = useCommandPalette()

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/")
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50"

  const hasActiveInGroup = (items: any[]) => items.some(item => isActive(item.url))
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="pt-4">
        {/* Search → opens command palette */}
        {!isCollapsed && (
          <div className="px-4 mb-6">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open command palette"
              className="w-full flex items-center gap-2 h-9 rounded-md border border-input bg-background px-3 text-left text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1">Search…</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">⌘K</kbd>
            </button>
          </div>
        )}

        {/* Audiences */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Documentation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {audienceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Resources */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}