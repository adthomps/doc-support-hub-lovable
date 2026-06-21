import { NavLink } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { CodeBlock } from "@/components/apt/CodeBlock"
import { apiSurfaces, guidingPrinciple } from "@/content/apiSurfaces"

const statusVariant = {
  stable: "accent",
  internal: "muted",
  preview: "warning",
} as const

const diagram = `External REST API
        │
        ▼
Application Service / Use Case Layer
        │
        ▼
Internal JSON-RPC Command Layer
        │
        ▼
Provider Adapters / Domain Services
        │
        ▼
Cybersource · Authorize.net compat · future providers`

export default function ApiOverview() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="API direction"
      title="Multi-surface API architecture"
      description={guidingPrinciple}
      actions={<AptTag variant="accent">Reference</AptTag>}
    >
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {apiSurfaces.map((s) => (
            <AptCard key={s.id} variant="default" padding="default">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{s.name}</h3>
                  <AptTag variant={statusVariant[s.status]}>{s.status}</AptTag>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.purpose}</p>
                <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Users:</span> {s.users}</p>
                <NavLink to={s.path} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </NavLink>
              </div>
            </AptCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base">Boundary diagram</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <CodeBlock code={diagram} label="layers" />
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base">External vs internal rules</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p><span className="font-medium text-foreground">External REST</span> never leaks adapter names, raw provider bodies, internal IDs, or routing decisions.</p>
              <p><span className="font-medium text-foreground">Internal JSON-RPC</span> evolves faster and is not exposed publicly unless intentionally promoted.</p>
              <p><span className="font-medium text-foreground">Compatibility layers</span> are isolated under <code className="font-mono text-foreground">compat.*</code> and translate legacy shapes into normalized commands.</p>
              <p><span className="font-medium text-foreground">AI tools</span> call governed methods only — never raw provider APIs.</p>
            </AptCardContent>
          </AptCard>
        </div>

        <div className="flex flex-wrap gap-3">
          <NavLink to="/api/rest" className="text-sm text-primary hover:underline">REST resources →</NavLink>
          <NavLink to="/api/rpc" className="text-sm text-primary hover:underline">JSON-RPC methods →</NavLink>
          <NavLink to="/api/events" className="text-sm text-primary hover:underline">Events →</NavLink>
          <NavLink to="/api/webhooks" className="text-sm text-primary hover:underline">Webhooks guide →</NavLink>
          <NavLink to="/api/ai-tools" className="text-sm text-primary hover:underline">AI tools →</NavLink>
          <NavLink to="/api/errors" className="text-sm text-primary hover:underline">Error catalog →</NavLink>
          <NavLink to="/api/compatibility" className="text-sm text-primary hover:underline">Compatibility →</NavLink>
          <NavLink to="/architecture/adrs" className="text-sm text-primary hover:underline">ADRs →</NavLink>
        </div>
      </div>
    </AptSection>
  )
}
