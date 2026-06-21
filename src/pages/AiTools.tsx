import { useMemo, useState } from "react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { SideEffectTag } from "@/components/apt/SideEffectTag"
import { aiTools, type AiTool } from "@/content/aiTools"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function ToolRow({ t }: { t: AiTool }) {
  return (
    <AptCard variant="default" padding="dense" className="flex items-center gap-3 flex-wrap">
      <code className="text-sm font-mono text-foreground">{t.name}</code>
      <SideEffectTag value={t.sideEffect} />
      <AptTag variant="muted" className="font-mono">{t.scope}</AptTag>
      {t.approvalRequired && <AptTag variant="warning">approval required</AptTag>}
      {t.dryRun && <AptTag variant="muted">dry-run</AptTag>}
      <span className="ml-auto text-xs text-muted-foreground hidden md:inline">{t.description}</span>
    </AptCard>
  )
}

export default function AiTools() {
  const [aud, setAud] = useState<AiTool["audience"]>("merchant")
  const filtered = useMemo(() => aiTools.filter((t) => t.audience === aud), [aud])

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="AI tools"
      title="Governed AI tool catalog"
      description="AI assistants use curated tools — not raw payment APIs. Defaults are read-only or draft-only; money movement and security-sensitive tools require human approval."
      actions={<AptTag variant="warning">Preview</AptTag>}
    >
      <div className="space-y-6">
        <Tabs value={aud} onValueChange={(v) => setAud(v as AiTool["audience"])}>
          <TabsList>
            <TabsTrigger value="merchant">Merchant</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
          </TabsList>
          <TabsContent value={aud} className="space-y-2 pt-4">
            {filtered.map((t) => <ToolRow key={t.name} t={t} />)}
          </TabsContent>
        </Tabs>

        <AptCard variant="default">
          <AptCardHeader><AptCardTitle className="text-base">Approval matrix</AptCardTitle></AptCardHeader>
          <AptCardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="py-2 pr-4">Action</th>
                  <th className="py-2 pr-4">AI allowed</th>
                  <th className="py-2">Approval</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Search transactions", "Yes", "No"],
                  ["Explain a decline", "Yes", "No"],
                  ["Validate webhook config", "Yes", "No"],
                  ["Create refund draft", "Yes", "No"],
                  ["Submit refund", "Restricted", "Yes"],
                  ["Capture payment", "Restricted", "Yes"],
                  ["Rotate webhook secret", "Restricted", "Yes"],
                  ["Change risk settings", "Restricted", "Yes"],
                ].map(([a, b, c]) => (
                  <tr key={a} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4 text-foreground">{a}</td>
                    <td className="py-2 pr-4">{b}</td>
                    <td className="py-2">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
