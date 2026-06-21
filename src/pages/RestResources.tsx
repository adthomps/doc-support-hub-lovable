import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag, type AptTagProps } from "@/components/apt/AptTag"
import { Input } from "@/components/ui/input"
import { CodeBlock } from "@/components/apt/CodeBlock"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { restResources, type RestEndpoint } from "@/content/restResources"

const methodVariant: Record<RestEndpoint["method"], AptTagProps["variant"]> = {
  GET: "muted",
  POST: "accent",
  PUT: "warning",
  DELETE: "warning",
}

export default function RestResources() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<RestEndpoint>(restResources[0].endpoints[0])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return restResources
    return restResources
      .map((r) => ({
        ...r,
        endpoints: r.endpoints.filter(
          (e) => e.path.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || r.name.toLowerCase().includes(q)
        ),
      }))
      .filter((r) => r.endpoints.length > 0)
  }, [query])

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="REST · v1"
      title="REST resource catalog"
      description="Public, versioned REST resources. Stable contract for external developers, merchants, and partners."
      actions={
        <div className="flex flex-wrap gap-2">
          <AptTag variant="accent">Public</AptTag>
          <a href="/samples/openapi.v1.yaml" download className="text-sm text-primary hover:underline">Download OpenAPI →</a>
          <a href="/samples/postman-collection.json" download className="text-sm text-primary hover:underline">Postman collection →</a>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resources or paths…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
          </div>

          <Accordion type="multiple" defaultValue={filtered.map((r) => r.id)} className="space-y-3">
            {filtered.map((r) => (
              <AptCard key={r.id} variant="default" padding="none">
                <AccordionItem value={r.id} className="border-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-semibold text-foreground">{r.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{r.basePath} · ids <code>{r.idPrefix}</code></span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{r.summary}</p>
                    <div className="space-y-2">
                      {r.endpoints.map((e) => {
                        const active = selected.path === e.path && selected.method === e.method
                        return (
                          <button key={`${e.method}-${e.path}`} onClick={() => setSelected(e)} className="block w-full text-left">
                            <AptCard variant={active ? "feature" : "interactive"} padding="dense" className="flex items-center gap-3 flex-wrap">
                              <AptTag variant={methodVariant[e.method]} className="font-mono w-16 justify-center">{e.method}</AptTag>
                              <code className="text-sm font-mono text-foreground">{e.path}</code>
                              {e.idempotent && <AptTag variant="muted">idempotent</AptTag>}
                              {e.scope && <AptTag variant="muted" className="font-mono">{e.scope}</AptTag>}
                              <span className="ml-auto text-xs text-muted-foreground hidden md:inline">{e.description}</span>
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
        </div>

        <aside className="space-y-6">
          <AptCard variant="elevated">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2 flex-wrap">
                <AptTag variant={methodVariant[selected.method]} className="font-mono">{selected.method}</AptTag>
                <code className="text-sm font-mono text-foreground">{selected.path}</code>
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
              <div className="flex flex-wrap gap-2">
                {selected.scope && <AptTag variant="muted" className="font-mono">{selected.scope}</AptTag>}
                {selected.idempotent && <AptTag variant="muted">requires Idempotency-Key</AptTag>}
              </div>
              {selected.request && <CodeBlock label="Request" code={selected.request} />}
              {selected.response && <CodeBlock label="Response" code={selected.response} />}
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
