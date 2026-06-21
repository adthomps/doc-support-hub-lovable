import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { Input } from "@/components/ui/input"
import { CodeBlock } from "@/components/apt/CodeBlock"
import { SideEffectTag } from "@/components/apt/SideEffectTag"
import { rpcMethods, type RpcMethod } from "@/content/rpcMethods"

export default function RpcMethods() {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<RpcMethod>(rpcMethods[0])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rpcMethods
    return rpcMethods.filter(
      (m) => m.name.toLowerCase().includes(q) || m.purpose.toLowerCase().includes(q) || m.domain.toLowerCase().includes(q)
    )
  }, [query])

  const byDomain = useMemo(() => {
    const groups: Record<string, RpcMethod[]> = {}
    for (const m of filtered) (groups[m.domain] ||= []).push(m)
    return groups
  }, [filtered])

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Internal · JSON-RPC 2.0"
      title="JSON-RPC method catalog"
      description="Internal command engine for orchestration, adapters, and AI tools. Not part of the public REST contract."
      actions={
        <div className="flex flex-wrap gap-2">
          <AptTag variant="muted">Internal</AptTag>
          <a href="/samples/jsonrpc-catalog.json" download className="text-sm text-primary hover:underline">Download catalog →</a>
        </div>
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search methods, domains, purposes…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
          </div>

          <div className="space-y-6">
            {Object.entries(byDomain).map(([domain, methods]) => (
              <div key={domain} className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">{domain}</h3>
                <div className="space-y-2">
                  {methods.map((m) => {
                    const active = selected.name === m.name
                    return (
                      <button key={m.name} onClick={() => setSelected(m)} className="block w-full text-left">
                        <AptCard variant={active ? "feature" : "interactive"} padding="dense" className="flex items-center gap-3 flex-wrap">
                          <code className="text-sm font-mono text-foreground">{m.name}</code>
                          <SideEffectTag value={m.sideEffect} />
                          {m.idempotent && <AptTag variant="muted">idempotent</AptTag>}
                          {m.approvalRequired && <AptTag variant="warning">approval required</AptTag>}
                          <span className="ml-auto text-xs text-muted-foreground hidden md:inline">{m.purpose}</span>
                        </AptCard>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <AptCard variant="elevated">
            <AptCardHeader>
              <AptCardTitle className="text-base font-mono">{selected.name}</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.purpose}</p>
              <div className="flex flex-wrap gap-2">
                <SideEffectTag value={selected.sideEffect} />
                <AptTag variant="muted" className="font-mono">{selected.scope}</AptTag>
                <AptTag variant="muted">owner: {selected.owner}</AptTag>
                {selected.idempotent && <AptTag variant="muted">idempotent</AptTag>}
                {selected.approvalRequired && <AptTag variant="warning">approval required</AptTag>}
              </div>
              <CodeBlock label="Request" code={selected.example.request} />
              <CodeBlock label="Response" code={selected.example.response} />
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
