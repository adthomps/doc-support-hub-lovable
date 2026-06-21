import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { scopes } from "@/content/scopes"
import { idPrefixes } from "@/content/idStandards"

export default function SecurityModel() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Architecture · Security"
      title="Authentication, scopes, and IDs"
      description="OAuth/OIDC for delegated access, API keys for server-to-server, short-lived scoped tokens where possible. Optional mTLS for high-risk partners."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader><AptCardTitle className="text-base">Scope catalog</AptCardTitle></AptCardHeader>
            <AptCardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4">Scope</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {scopes.map((s) => (
                    <tr key={s.name} className="border-b border-border/60 last:border-0 align-top">
                      <td className="py-2 pr-4"><AptTag variant="muted" className="font-mono">{s.name}</AptTag></td>
                      <td className="py-2 pr-4 text-muted-foreground text-xs">{s.category}</td>
                      <td className="py-2 text-muted-foreground">{s.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="default">
            <AptCardHeader><AptCardTitle className="text-base">ID prefixes</AptCardTitle></AptCardHeader>
            <AptCardContent>
              <table className="w-full text-sm">
                <tbody>
                  {idPrefixes.map((p) => (
                    <tr key={p.prefix} className="border-b border-border/60 last:border-0">
                      <td className="py-1.5 pr-4"><code className="font-mono text-foreground">{p.prefix}</code></td>
                      <td className="py-1.5 text-muted-foreground">{p.resource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
