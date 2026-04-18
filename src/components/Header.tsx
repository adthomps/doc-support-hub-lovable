import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Github, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-16 items-center px-4">
        <SidebarTrigger className="mr-3" />

        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card">
            <span className="font-semibold text-sm text-foreground">A</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <h1 className="text-sm font-semibold text-foreground">APT Docs</h1>
            <p className="text-xs text-muted-foreground">Knowledge & support</p>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
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
    </header>
  )
}
