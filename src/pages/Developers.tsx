import { useState } from "react"
import { FileText, Zap, ExternalLink, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"

const codeExample = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'`

const apiTopics = [
  { title: "Authentication", description: "API keys, OAuth, and security." },
  { title: "Users API", description: "Manage user accounts and profiles." },
  { title: "Webhooks", description: "Real-time event notifications." },
  { title: "Rate limits", description: "Usage limits and best practices." },
]

const sdks = ["JavaScript / Node.js", "Python", "PHP", "Ruby"]
const tools = ["API explorer", "Postman collection", "OpenAPI spec"]

export default function Developers() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Developers"
      title="Developer documentation"
      description="APIs, SDKs, and integration guides for building on the platform."
      actions={<AptTag variant="accent">Technical</AptTag>}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" /> Quick start
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get up and running with the API in minutes.
              </p>

              <ol className="space-y-2.5">
                {["Get your API key from the dashboard", "Install the SDK or call the API directly", "Make your first request"].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-secondary text-xs font-medium text-foreground">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="rounded-md border border-border bg-surface">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="text-xs font-medium text-muted-foreground">Example request</span>
                  <Button size="sm" variant="ghost" onClick={copyCode} className="h-7 w-7 p-0">
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
                <pre className="overflow-x-auto p-4 text-xs">
                  <code className="font-mono text-foreground">{codeExample}</code>
                </pre>
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" /> API reference
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {apiTopics.map((t) => (
                  <AptCard key={t.title} variant="interactive" padding="dense">
                    <h4 className="text-sm font-semibold text-foreground mb-1">{t.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
                  </AptCard>
                ))}
              </div>
            </AptCardContent>
          </AptCard>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base">SDKs & libraries</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              {sdks.map((s) => (
                <Button key={s} variant="outline" className="w-full justify-between">
                  {s} <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              ))}
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base">Developer tools</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              {tools.map((t) => (
                <Button key={t} variant="outline" className="w-full justify-between">
                  {t} <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              ))}
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base">Status</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm text-foreground">All systems operational</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">View status page</Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
