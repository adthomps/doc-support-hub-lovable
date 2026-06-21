import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"

export default function Versioning() {
  return (
    <AptSection
      spacing="compact"
      width="content"
      eyebrow="Architecture"
      title="Versioning policy"
      description="Public REST APIs use URL-level major versioning. Within a major version we never break clients."
    >
      <div className="space-y-6">
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Allowed non-breaking changes</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
              <li>Adding optional request fields</li>
              <li>Adding response fields</li>
              <li>Adding new endpoints</li>
              <li>Adding new enum values when clients are expected to tolerate unknowns</li>
              <li>Adding metadata fields</li>
            </ul>
          </AptCardContent>
        </AptCard>
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Breaking changes</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Removing fields, changing types, renaming endpoints, or tightening enum semantics requires a new major version
              (e.g. <code className="font-mono">/v2/...</code>). The previous major remains supported for at least 12 months
              with a deprecation header on every response.
            </p>
          </AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
