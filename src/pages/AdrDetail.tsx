import { NavLink, useParams } from "react-router-dom"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { adrs } from "@/content/adrs"

const statusVariant = {
  accepted: "accent",
  proposed: "warning",
  superseded: "muted",
} as const

export default function AdrDetail() {
  const { id } = useParams()
  const adr = adrs.find((a) => a.id === id)
  if (!adr) {
    return (
      <AptSection spacing="compact" width="content" title="Decision not found">
        <NavLink to="/architecture/adrs" className="text-sm text-primary hover:underline">Back to ADRs</NavLink>
      </AptSection>
    )
  }
  return (
    <AptSection
      spacing="compact"
      width="content"
      eyebrow={adr.id}
      title={adr.title}
      actions={<AptTag variant={statusVariant[adr.status]}>{adr.status}</AptTag>}
    >
      <div className="space-y-6">
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Context</AptCardTitle></AptCardHeader>
          <AptCardContent><p className="text-sm text-muted-foreground leading-relaxed">{adr.context}</p></AptCardContent>
        </AptCard>
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Decision</AptCardTitle></AptCardHeader>
          <AptCardContent><p className="text-sm text-muted-foreground leading-relaxed">{adr.decision}</p></AptCardContent>
        </AptCard>
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Consequences</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {adr.consequences.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </AptCardContent>
        </AptCard>
        {adr.related && adr.related.length > 0 && (
          <AptCard variant="subtle" padding="default">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Related</span>
              {adr.related.map((r) => (
                <NavLink key={r} to={`/architecture/adrs/${r}`} className="text-sm text-primary hover:underline font-mono">{r}</NavLink>
              ))}
            </div>
          </AptCard>
        )}
        <NavLink to="/architecture/adrs" className="text-sm text-primary hover:underline">← All ADRs</NavLink>
      </div>
    </AptSection>
  )
}
