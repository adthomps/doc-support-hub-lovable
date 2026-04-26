import { Link } from "react-router-dom"
import { overallStatus, statusLabel } from "@/content/status"

const cols = [
  { title: "Audiences", links: [["Developers", "/developers"], ["Businesses", "/businesses"], ["Resellers", "/resellers"]] },
  { title: "Resources", links: [["Getting started", "/getting-started"], ["API reference", "/api"], ["Changelog", "/changelog"]] },
  { title: "Support", links: [["FAQ", "/faq"], ["Contact support", "/support"], ["System status", "/status"]] },
] as const

export function Footer() {
  const status = overallStatus()
  const dot = status === "operational" ? "bg-success" : "bg-warning"

  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 py-10 max-w-screen-2xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
              <span className="text-xs font-semibold text-foreground">A</span>
            </div>
            <span className="text-sm font-semibold text-foreground">APT Docs</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Built on APT principles — Applied Practical Thinking. Calm, structured, production-grade docs.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-foreground hover:text-accent transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="px-6 py-4 max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <a
            href="https://github.com/adthomps/apt-principles"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            APT Principles ↗
          </a>
          <Link to="/status" className="flex items-center gap-2 hover:text-foreground transition-colors">
            <span className={`h-2 w-2 rounded-full ${dot}`} />
            {statusLabel[status]}
          </Link>
        </div>
      </div>
    </footer>
  )
}
