import * as React from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Code, Users, Shield, FileText, MessageCircle, HeadphonesIcon, Zap, Settings, Home } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

type Item = { title: string; url: string; icon: React.ComponentType<{ className?: string }>; group: string }

const items: Item[] = [
  { title: "Home", url: "/", icon: Home, group: "Navigate" },
  { title: "Developers", url: "/developers", icon: Code, group: "Audiences" },
  { title: "Businesses", url: "/businesses", icon: Users, group: "Audiences" },
  { title: "Resellers", url: "/resellers", icon: Shield, group: "Audiences" },
  { title: "Getting started", url: "/getting-started", icon: BookOpen, group: "Resources" },
  { title: "API reference", url: "/api", icon: FileText, group: "Resources" },
  { title: "Changelog", url: "/changelog", icon: Settings, group: "Resources" },
  { title: "FAQ", url: "/faq", icon: MessageCircle, group: "Support" },
  { title: "Contact support", url: "/support", icon: HeadphonesIcon, group: "Support" },
  { title: "System status", url: "/status", icon: Zap, group: "Support" },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const go = (url: string) => {
    onOpenChange(false)
    navigate(url)
  }

  const groups = Array.from(new Set(items.map((i) => i.group)))

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search documentation, guides, articles…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, gi) => (
          <React.Fragment key={group}>
            {gi > 0 && <CommandSeparator />}
            <CommandGroup heading={group}>
              {items
                .filter((i) => i.group === group)
                .map((i) => (
                  <CommandItem key={i.url} onSelect={() => go(i.url)}>
                    <i.icon className="mr-2 h-4 w-4" />
                    <span>{i.title}</span>
                  </CommandItem>
                ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
