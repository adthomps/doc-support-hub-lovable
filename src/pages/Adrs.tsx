import { NavLink } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { adrs } from "@/content/adrs"

const statusVariant = {
  accepted: "accent",
  proposed: "warning",
  superseded: "muted",
} as const

export default function Adrs() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Architecture"
      title="Architecture decision records"
      description="The architectural choices behind the multi-surface API direction."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {adrs.map((a) => (
          <NavLink key={a.id} to={`/architecture/adrs/${a.id}`}>
            <AptCard variant="interactive" padding="default" className="h-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">{a.id}</span>
                  <AptTag variant={statusVariant[a.status]}>{a.status}</AptTag>
                </div>
                <AptCardTitle className="text-base">{a.title}</AptCardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.context}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary">Read decision <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </AptCard>
          </NavLink>
        ))}
      </div>
    </AptSection>
  )
}
