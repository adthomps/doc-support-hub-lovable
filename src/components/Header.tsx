import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Github, ExternalLink, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { CommandPalette } from "@/components/CommandPalette"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-16 items-center px-4 gap-3">
        <SidebarTrigger />

        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card">
            <span className="font-semibold text-sm text-foreground">A</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <h1 className="text-sm font-semibold text-foreground">APT Docs</h1>
            <p className="text-xs text-muted-foreground">Knowledge & support</p>
          </div>
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="ml-4 hidden md:flex items-center gap-2 h-9 w-72 rounded-md border border-border bg-card px-3 text-left text-sm text-muted-foreground hover:bg-secondary/40 transition-colors"
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1">Search documentation…</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Open search" onClick={() => setOpen(true)} className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit app
          </Button>
        </div>
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} />
    </header>
  )
}
