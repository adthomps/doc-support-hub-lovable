import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { CodeBlock } from "@/components/apt/CodeBlock"
import { events, eventEnvelopeExample } from "@/content/events"

export default function Events() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Events"
      title="Event catalog"
      description="Lifecycle events delivered to webhook subscribers using a CloudEvents-style envelope. The event log is the source of truth."
      actions={
        <div className="flex flex-wrap gap-2">
          <AptTag variant="accent">Stable</AptTag>
          <a href="/samples/events.cloudevents.json" download className="text-sm text-primary hover:underline">Download samples →</a>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {events.map((e) => (
            <AptCard key={e.type} variant="default" padding="default">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <code className="text-sm font-mono text-foreground">{e.type}</code>
                  <AptTag variant="muted" className="font-mono">subject: {e.subjectIdPrefix}*</AptTag>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                <CodeBlock label="data" code={e.samplePayload} />
              </div>
            </AptCard>
          ))}
        </div>

        <aside className="space-y-6">
          <AptCard variant="elevated">
            <AptCardHeader>
              <AptCardTitle className="text-base">Envelope</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every event is wrapped in the same envelope. The <code className="font-mono">data</code> shape varies per type.
              </p>
              <CodeBlock label="event" code={eventEnvelopeExample} />
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
