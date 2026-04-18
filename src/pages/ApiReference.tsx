import { useMemo, useState } from "react"
import { Search, Copy, Check } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag, type AptTagProps } from "@/components/apt/AptTag"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Method = "GET" | "POST" | "PUT" | "DELETE"
type Endpoint = {
  method: Method
  path: string
  description: string
  request?: string
  response: string
}

const groups: { id: string; title: string; endpoints: Endpoint[] }[] = [
  {
    id: "auth",
    title: "Auth",
    endpoints: [
      { method: "POST", path: "/v1/auth/token", description: "Exchange credentials for an access token.", request: `{ "client_id": "...", "client_secret": "..." }`, response: `{ "access_token": "eyJ...", "expires_in": 3600 }` },
      { method: "POST", path: "/v1/auth/revoke", description: "Revoke an access token.", request: `{ "token": "eyJ..." }`, response: `{ "revoked": true }` },
    ],
  },
  {
    id: "users",
    title: "Users",
    endpoints: [
      { method: "GET", path: "/v1/users", description: "List users with pagination.", response: `{ "data": [{ "id": "u_1", "email": "a@b.co" }], "next": null }` },
      { method: "POST", path: "/v1/users", description: "Create a new user.", request: `{ "name": "John", "email": "j@x.co" }`, response: `{ "id": "u_2", "name": "John" }` },
      { method: "GET", path: "/v1/users/:id", description: "Retrieve a single user.", response: `{ "id": "u_1", "email": "a@b.co" }` },
      { method: "DELETE", path: "/v1/users/:id", description: "Delete a user.", response: `{ "deleted": true }` },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    endpoints: [
      { method: "POST", path: "/v1/charges", description: "Create a charge.", request: `{ "amount": 1999, "currency": "usd" }`, response: `{ "id": "ch_1", "status": "succeeded" }` },
      { method: "GET", path: "/v1/payouts", description: "List payouts.", response: `{ "data": [{ "id": "po_1", "amount": 12000 }] }` },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    endpoints: [
      { method: "POST", path: "/v1/webhooks", description: "Register a webhook endpoint.", request: `{ "url": "https://...", "events": ["charge.succeeded"] }`, response: `{ "id": "wh_1" }` },
      { method: "GET", path: "/v1/webhooks", description: "List webhook endpoints.", response: `{ "data": [{ "id": "wh_1" }] }` },
      { method: "DELETE", path: "/v1/webhooks/:id", description: "Delete a webhook.", response: `{ "deleted": true }` },
    ],
  },
]

const methodVariant: Record<Method, AptTagProps["variant"]> = {
  GET: "muted",
  POST: "accent",
  PUT: "warning",
  DELETE: "warning",
}

export default function ApiReference() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Endpoint>(groups[0].endpoints[0])
  const [copied, setCopied] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({
        ...g,
        endpoints: g.endpoints.filter(
          (e) => e.path.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.method.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.endpoints.length > 0)
  }, [query])

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Resources"
      title="API reference"
      description="Browse endpoints by group. Select any endpoint to view example request and response."
      actions={<AptTag variant="accent">Technical</AptTag>}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search endpoints, methods, paths…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {filtered.length === 0 ? (
            <AptCard variant="subtle" padding="default">
              <p className="text-sm text-muted-foreground">No endpoints match "{query}".</p>
            </AptCard>
          ) : (
            <Accordion type="multiple" defaultValue={filtered.map((g) => g.id)} className="space-y-3">
              {filtered.map((g) => (
                <AptCard key={g.id} variant="default" padding="none">
                  <AccordionItem value={g.id} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="text-sm font-semibold text-foreground">{g.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-2">
                        {g.endpoints.map((e) => {
                          const active = selected.path === e.path && selected.method === e.method
                          return (
                            <button key={`${e.method}-${e.path}`} onClick={() => setSelected(e)} className="block w-full text-left">
                              <AptCard variant={active ? "feature" : "interactive"} padding="dense" className="flex items-center gap-3">
                                <AptTag variant={methodVariant[e.method]} className="font-mono w-16 justify-center">
                                  {e.method}
                                </AptTag>
                                <code className="text-sm font-mono text-foreground">{e.path}</code>
                                <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">{e.description}</span>
                              </AptCard>
                            </button>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </AptCard>
              ))}
            </Accordion>
          )}
        </div>

        <aside className="space-y-4">
          <AptCard variant="elevated">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2">
                <AptTag variant={methodVariant[selected.method]} className="font-mono">{selected.method}</AptTag>
                <code className="text-sm font-mono text-foreground">{selected.path}</code>
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>

              {selected.request && (
                <div className="rounded-md border border-border bg-surface">
                  <div className="flex items-center justify-between border-b border-border px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">Request</span>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => copy(selected.request!)}>
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                  <pre className="overflow-x-auto p-3 text-xs"><code className="font-mono text-foreground">{selected.request}</code></pre>
                </div>
              )}

              <div className="rounded-md border border-border bg-surface">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="text-xs font-medium text-muted-foreground">Response</span>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => copy(selected.response)}>
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
                <pre className="overflow-x-auto p-3 text-xs"><code className="font-mono text-foreground">{selected.response}</code></pre>
              </div>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
