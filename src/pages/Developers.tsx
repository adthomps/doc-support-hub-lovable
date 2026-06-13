import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { FileText, Zap, ExternalLink, Copy, Check, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import { useArticleFilters, ArticleFiltersBar } from "@/hooks/useArticleFilters"
import { PersonaTabs, usePersona } from "@/components/PersonaTabs"
import { articlesByPersona, categoriesFor } from "@/content/articles"

const codeExample = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'`

const sdks = ["JavaScript / Node.js", "Python", "PHP", "Ruby"]
const tools = ["API explorer", "Postman collection", "OpenAPI spec"]

export default function Developers() {
  const [copied, setCopied] = useState(false)
  const { persona, setPersona, description } = usePersona("developers")
  const articles = useMemo(() => articlesByPersona("developers", persona), [persona])
  const categories = categoriesFor("developers")
  const filters = useArticleFilters(articles)

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
                  <Button size="sm" variant="ghost" onClick={copyCode} className="h-7 w-7 p-0" aria-label="Copy code">
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
                <FileText className="h-4 w-4 text-muted-foreground" /> Popular articles
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <ArticleFiltersBar state={filters} />
              {filters.filtered.length === 0 ? (
                <EmptyState title="No matching articles" description="Try a different keyword or change the read-time filter." />
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {filters.filtered.map((a) => (
                    <Link key={a.slug} to={`/developers/articles/${a.slug}`}>
                      <AptCard variant="interactive" padding="dense" className="h-full">
                        <h4 className="text-sm font-semibold text-foreground mb-1">{a.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{a.summary}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <AptTag variant="muted">{a.categoryLabel}</AptTag>
                          <span>{a.readTime}</span>
                        </div>
                      </AptCard>
                    </Link>
                  ))}
                </div>
              )}
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle>Browse by category</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <Link key={c.slug} to={`/developers/category/${c.slug}`}>
                    <AptCard variant="interactive" padding="dense">
                      <h3 className="text-sm font-semibold text-foreground mb-1">{c.label}</h3>
                      <AptTag variant="muted">{c.count} article{c.count === 1 ? "" : "s"}</AptTag>
                    </AptCard>
                  </Link>
                ))}
              </div>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base">SDKs & libraries</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              {sdks.map((s) => (
                <Button key={s} variant="outline" className="w-full justify-between" onClick={() => toast.info(`${s} SDK — POC link`)}>
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
                <Button key={t} variant="outline" className="w-full justify-between" asChild>
                  <Link to="/api">{t} <ArrowRight className="h-3.5 w-3.5" /></Link>
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
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/status">View status page</Link>
              </Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
