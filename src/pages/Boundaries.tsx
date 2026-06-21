import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { CodeBlock } from "@/components/apt/CodeBlock"

const diagram = `┌────────────────────────────────────────────────┐
│  External clients (merchants, partners, SDKs)  │
└────────────────────────┬───────────────────────┘
                         │  REST /v1/*  (public contract)
                         ▼
┌────────────────────────────────────────────────┐
│  Application services / use cases              │
└────────────────────────┬───────────────────────┘
                         │  JSON-RPC  (internal commands)
                         ▼
┌────────────────────────────────────────────────┐
│  Domain services · Provider adapters · Compat  │
└────────────────────────┬───────────────────────┘
                         │  Vendor SDKs / HTTP
                         ▼
                   Cybersource · Authorize.net · …

  AI tools call governed RPC methods (read/draft default).
  Events flow out from application workflows to webhooks.`

export default function Boundaries() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Architecture"
      title="Boundaries & what does (not) leak"
      description="Each layer owns a different responsibility. The public REST contract is intentionally narrower than the internal command surface."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Layered model</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="layers" code={diagram} /></AptCardContent>
        </AptCard>
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Does leak (controlled)</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
              <li>Network response code</li>
              <li>Processor response code</li>
              <li>Decline reason category</li>
              <li>request_id, transaction_id, provider_reference_id</li>
              <li>Risk review status</li>
              <li>Settlement batch reference</li>
            </ul>
          </AptCardContent>
        </AptCard>
        <AptCard variant="default" className="lg:col-span-2">
          <AptCardHeader><AptCardTitle className="text-base">Does not leak</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
              <li>Internal adapter names</li>
              <li>Raw provider request / response bodies</li>
              <li>Internal database IDs</li>
              <li>Internal routing decisions</li>
              <li>Processor-specific fields without abstraction</li>
              <li>Private risk model details</li>
              <li>Internal JSON-RPC method names</li>
            </ul>
          </AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
