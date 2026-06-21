import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { CodeBlock } from "@/components/apt/CodeBlock"
import { errorEnvelopeExample, restErrorCodes, rpcErrorCodes } from "@/content/errorCodes"

export default function ErrorCatalog() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Errors"
      title="Unified error catalog"
      description="One error envelope across REST, JSON-RPC, and AI tools. JSON-RPC codes mirror REST codes via numeric mapping."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader><AptCardTitle className="text-base">REST error codes</AptCardTitle></AptCardHeader>
            <AptCardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b border-border">
                      <th className="py-2 pr-4">Code</th>
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2 pr-4">Meaning</th>
                      <th className="py-2">Remediation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restErrorCodes.map((e) => (
                      <tr key={e.code} className="border-b border-border/60 last:border-0 align-top">
                        <td className="py-2 pr-4"><AptTag variant="muted" className="font-mono">{e.code}</AptTag></td>
                        <td className="py-2 pr-4 text-muted-foreground font-mono text-xs">{e.type}</td>
                        <td className="py-2 pr-4 text-foreground">{e.meaning}</td>
                        <td className="py-2 text-muted-foreground">{e.remediation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader><AptCardTitle className="text-base">JSON-RPC error codes</AptCardTitle></AptCardHeader>
            <AptCardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4">Code</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {rpcErrorCodes.map((e) => (
                    <tr key={e.code} className="border-b border-border/60 last:border-0 align-top">
                      <td className="py-2 pr-4"><AptTag variant={e.code <= -32600 ? "muted" : "warning"} className="font-mono">{e.code}</AptTag></td>
                      <td className="py-2 pr-4 text-foreground font-mono text-xs">{e.name}</td>
                      <td className="py-2 text-muted-foreground">{e.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="elevated">
            <AptCardHeader><AptCardTitle className="text-base">Envelope</AptCardTitle></AptCardHeader>
            <AptCardContent>
              <CodeBlock label="error" code={errorEnvelopeExample} />
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
