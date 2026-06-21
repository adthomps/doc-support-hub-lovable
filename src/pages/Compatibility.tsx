import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { CodeBlock } from "@/components/apt/CodeBlock"

const legacy = `<!-- Authorize.net createTransactionRequest (legacy shape) -->
{
  "createTransactionRequest": {
    "merchantAuthentication": { "name": "...", "transactionKey": "..." },
    "transactionRequest": {
      "transactionType": "authCaptureTransaction",
      "amount": "12.99",
      "payment": { "creditCard": { "cardNumber": "4242...", "expirationDate": "1230" } }
    }
  }
}`

const normalized = `// Translated into a normalized internal command
{
  "jsonrpc": "2.0",
  "id": "req_1",
  "method": "payment.authorize",
  "params": {
    "merchant_id": "mer_123",
    "amount": 1299,
    "currency": "USD",
    "payment_method_token": "tok_abc",
    "capture": true,
    "idempotency_key": "idem_1"
  }
}`

const route = `compat.authorizenet.createTransactionRequest
        │  (translate legacy → normalized)
        ▼
payment.authorize     (internal JSON-RPC)
        │
        ▼
provider.cybersource.authorize     (adapter)
        │
        ▼
Cybersource API`

export default function Compatibility() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Compatibility"
      title="Legacy compatibility layers"
      description="Authorize.net- and Cybersource-shaped requests are accepted at the edge, translated into normalized commands, and routed through the current provider adapter. Legacy shapes never leak into the public REST model."
      actions={<AptTag variant="muted">Internal</AptTag>}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Legacy request</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="authorize.net" code={legacy} /></AptCardContent>
        </AptCard>
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Normalized command</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="payment.authorize" code={normalized} /></AptCardContent>
        </AptCard>
        <AptCard variant="default" className="lg:col-span-2">
          <AptCardHeader><AptCardTitle className="text-base">Routing path</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="flow" code={route} /></AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
