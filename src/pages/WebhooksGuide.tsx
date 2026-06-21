import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { CodeBlock } from "@/components/apt/CodeBlock"

const register = `POST /v1/webhooks/endpoints
Authorization: Bearer sk_live_...
Content-Type: application/json

{
  "url": "https://example.com/hook",
  "events": ["payment.authorized", "refund.succeeded"]
}`

const verify = `// Node.js / Express
import crypto from "node:crypto"

const SIGNING_SECRET = process.env.APT_WEBHOOK_SECRET

app.post("/hook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.header("apt-signature") // t=...,v1=...
  const [t, v1] = sig.split(",").map(p => p.split("=")[1])
  const payload = \`\${t}.\${req.body.toString("utf8")}\`
  const expected = crypto.createHmac("sha256", SIGNING_SECRET).update(payload).digest("hex")
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1))) {
    return res.status(400).send("invalid signature")
  }
  const event = JSON.parse(req.body.toString("utf8"))
  // handle event.type ...
  res.status(200).send("ok")
})`

const replay = `POST /v1/events/evt_123/replay
Authorization: Bearer sk_live_...`

export default function WebhooksGuide() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Webhooks"
      title="Webhook delivery guide"
      description="Register endpoints, verify signatures, handle retries, and replay events. All examples are stubs — no live delivery from this site."
      actions={<AptTag variant="accent">Stable</AptTag>}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">1. Register an endpoint</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="curl" code={register} /></AptCardContent>
        </AptCard>

        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">2. Verify the signature</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="node" code={verify} /></AptCardContent>
        </AptCard>

        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">3. Retry policy</AptCardTitle></AptCardHeader>
          <AptCardContent className="text-sm text-muted-foreground space-y-2 leading-relaxed">
            <p>Failed deliveries (non-2xx, timeout &gt; 10s) retry on exponential backoff:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 min, 5 min, 30 min, 2 h, 6 h, 12 h, 24 h</li>
              <li>Up to 7 attempts over ~3 days</li>
              <li>After exhaustion the endpoint is marked <code className="font-mono">degraded</code></li>
            </ul>
          </AptCardContent>
        </AptCard>

        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">4. Replay an event</AptCardTitle></AptCardHeader>
          <AptCardContent><CodeBlock label="curl" code={replay} /></AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
