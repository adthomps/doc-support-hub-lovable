import { Link, useLocation } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

const titleMap: Record<string, string> = {
  developers: "Developers",
  businesses: "Businesses",
  resellers: "Resellers",
  "getting-started": "Getting started",
  api: "API reference",
  changelog: "Changelog",
  faq: "FAQ",
  support: "Support",
  status: "Status",
  articles: "Articles",
  category: "Categories",
}

function pretty(seg: string) {
  return titleMap[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export function AptBreadcrumbs() {
  const { pathname } = useLocation()
  if (pathname === "/") return null
  const parts = pathname.split("/").filter(Boolean)

  const crumbs = parts.map((seg, i) => {
    const href = "/" + parts.slice(0, i + 1).join("/")
    return { href, label: pretty(seg), last: i === parts.length - 1 }
  })

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-background">
      <ol className="flex items-center gap-1.5 px-6 py-3 text-xs text-muted-foreground max-w-screen-2xl mx-auto">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            {c.last ? (
              <span className="text-foreground font-medium">{c.label}</span>
            ) : (
              <Link to={c.href} className="hover:text-foreground transition-colors">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
