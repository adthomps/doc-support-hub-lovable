import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Audience = "developers" | "businesses" | "resellers"
type QA = { q: string; a: string }

const faqs: Record<Audience, QA[]> = {
  developers: [
    { q: "How do I get an API key?", a: "Open the dashboard, go to Settings → API keys, and click Generate." },
    { q: "What rate limits apply?", a: "Default is 1,000 requests/minute per key. Contact support to raise limits." },
    { q: "Which SDKs are supported?", a: "JavaScript/Node, Python, PHP, and Ruby — see the Developers page." },
    { q: "How do I verify webhook signatures?", a: "Compute HMAC-SHA256 over the raw body using your signing secret." },
    { q: "Is there a sandbox environment?", a: "Yes. Use keys prefixed with sk_test_ to hit the sandbox." },
    { q: "Where can I report a bug?", a: "Open a ticket in Support, or use the issue tracker linked in the docs." },
  ],
  businesses: [
    { q: "When do payouts arrive?", a: "Standard payouts settle in 2 business days from capture." },
    { q: "How do I respond to a dispute?", a: "Open the dispute, attach evidence, and submit a response within 7 days." },
    { q: "Can I issue partial refunds?", a: "Yes — choose Partial when refunding from the dashboard or API." },
    { q: "How do I update my bank account?", a: "Go to Settings → Payouts and follow the verification flow." },
    { q: "What payment methods are supported?", a: "Cards, ACH, SEPA, and major wallets depending on region." },
    { q: "How do I download invoices?", a: "Open Billing, select an invoice, and click Download PDF." },
  ],
  resellers: [
    { q: "How is commission calculated?", a: "Commission is a percentage of net revenue, paid monthly." },
    { q: "Can I white-label the platform?", a: "Yes, with a Tier 2 partnership or above." },
    { q: "How do I add a sub-account?", a: "Use the partner portal → Accounts → New, then send the invite." },
    { q: "Where are marketing assets?", a: "Partner portal → Assets, includes logos, decks, and case studies." },
    { q: "Is training required?", a: "All resellers must complete the onboarding module before going live." },
    { q: "Who do I contact for partner support?", a: "Use the dedicated partner Slack channel or partner-support@." },
  ],
}

const labels: Record<Audience, string> = {
  developers: "Developers",
  businesses: "Businesses",
  resellers: "Resellers",
}

export default function Faq() {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<Audience>("developers")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    const out = {} as Record<Audience, QA[]>
    ;(Object.keys(faqs) as Audience[]).forEach((k) => {
      out[k] = faqs[k].filter((qa) => qa.q.toLowerCase().includes(q) || qa.a.toLowerCase().includes(q))
    })
    return out
  }, [query])

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Support"
      title="Frequently asked questions"
      description="Answers grouped by audience. Use the search to filter across all tabs."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search FAQs…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as Audience)}>
            <TabsList>
              {(Object.keys(faqs) as Audience[]).map((k) => (
                <TabsTrigger key={k} value={k}>
                  {labels[k]} <span className="ml-2 text-xs text-muted-foreground">({filtered[k].length})</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {(Object.keys(faqs) as Audience[]).map((k) => (
              <TabsContent key={k} value={k} className="mt-4">
                {filtered[k].length === 0 ? (
                  <AptCard variant="subtle" padding="default">
                    <p className="text-sm text-muted-foreground">No questions match "{query}".</p>
                  </AptCard>
                ) : (
                  <AptCard variant="default" padding="none">
                    <Accordion type="single" collapsible>
                      {filtered[k].map((qa, i) => (
                        <AccordionItem key={i} value={`${k}-${i}`} className="border-border last:border-0">
                          <AccordionTrigger className="px-6 hover:no-underline text-sm font-medium text-foreground text-left">
                            {qa.q}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                            {qa.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AptCard>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Still need help?</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full" asChild>
                <Link to="/support">Contact support</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/status">Check system status</Link>
              </Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
