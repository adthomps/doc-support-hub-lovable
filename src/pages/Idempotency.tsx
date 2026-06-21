import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { CodeBlock } from "@/components/apt/CodeBlock"

const restEx = `POST /v1/refunds
Authorization: Bearer sk_live_...
Idempotency-Key: 2f7c1b1c-3a01-4d2a-9c66-5b3f0a0a5c0b
Content-Type: application/json

{ "transaction": "txn_123", "amount": 500 }`

const rpcEx = `{
  "jsonrpc": "2.0",
  "id": "req_1",
  "method": "payment.refund",
  "params": {
    "transaction_id": "txn_123",
    "amount": 500,
    "idempotency_key": "idem_2f7c1b1c"
  }
}`

export default function Idempotency() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Architecture"
      title="Idempotency policy"
      description="All money-moving operations require an idempotency key. The server replays the original response if the same key is reused with the same payload."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">REST · Idempotency-Key header</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="curl" code={restEx} /></AptCardContent>
        </AptCard>
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">JSON-RPC · idempotency_key param</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="rpc" code={rpcEx} /></AptCardContent>
        </AptCard>
        <AptCard variant="default" className="lg:col-span-2">
          <AptCardHeader><AptCardTitle className="text-base">Required for</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground leading-relaxed">
              <li>Payment intent creation, confirmation, capture</li>
              <li>Refunds and voids</li>
              <li>Customer creation where duplicate risk exists</li>
              <li>Payment method tokenization</li>
              <li>Webhook event replay</li>
              <li>Settlement reconciliation jobs</li>
            </ul>
          </AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
