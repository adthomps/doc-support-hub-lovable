import { useMemo } from "react"
import { Link } from "react-router-dom"
import { BookOpen, Video, HelpCircle, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import { useArticleFilters, ArticleFiltersBar } from "@/hooks/useArticleFilters"
import { PersonaTabs, usePersona } from "@/components/PersonaTabs"
import { articlesByPersona, categoriesFor } from "@/content/articles"

const videoTutorials = [
  { title: "Merchant dashboard tour", duration: "10:12" },
  { title: "Setting up payouts", duration: "7:45" },
  { title: "Resolving a dispute", duration: "9:08" },
]

export default function Businesses() {
  const { persona, setPersona, description } = usePersona("businesses")
  const articles = useMemo(() => articlesByPersona("businesses", persona), [persona])
  const categories = categoriesFor("businesses")
  const filters = useArticleFilters(articles)

  const download = (name: string) => toast.info(`${name} — download starting (POC)`)

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Businesses"
      title="Business & merchant hub"
      description="Operational guides for merchants and business users — onboarding, payments, billing, and dispute handling."
      actions={<AptTag>Merchant</AptTag>}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" /> Popular guides
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <PersonaTabs audience="businesses" persona={persona} onChange={setPersona} />
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
              <ArticleFiltersBar state={filters} />
              {filters.filtered.length === 0 ? (
                <EmptyState title="No matching guides" description="Try a different keyword or change the read-time filter." />
              ) : (
                <div className="space-y-2">
                  {filters.filtered.map((g) => (
                    <Link key={g.slug} to={`/businesses/articles/${g.slug}`}>
                      <AptCard variant="interactive" padding="dense" className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{g.title}</h3>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <AptTag variant="muted">{g.categoryLabel}</AptTag>
                            <span>{g.readTime}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </AptCard>
                    </Link>
                  ))}
                </div>
              )}
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <Video className="h-4 w-4 text-muted-foreground" /> Video tutorials
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                {videoTutorials.map((v) => (
                  <button key={v.title} onClick={() => toast.info(`${v.title} — opening (POC)`)} className="text-left">
                    <AptCard variant="interactive" padding="dense">
                      <div className="aspect-video rounded-md bg-secondary border border-border mb-3 flex items-center justify-center">
                        <Video className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-sm font-medium text-foreground">{v.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{v.duration}</p>
                    </AptCard>
                  </button>
                ))}
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle>Browse by category</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <Link key={c.slug} to={`/businesses/category/${c.slug}`}>
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
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Need more help?</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full" asChild>
                <Link to="/support">Contact support</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => toast.info("Live chat — coming soon")}>Live chat</Button>
              <Button variant="outline" className="w-full" onClick={() => toast.info("Community forum — coming soon")}>Community forum</Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> Quick FAQ
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">When do payouts arrive?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Standard payouts settle in 2 business days…</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">How do I respond to a dispute?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Open the dispute, attach evidence, submit…</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/faq">View all FAQs</Link>
              </Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base">Downloads</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between" onClick={() => download("Merchant app (iOS)")}>
                Merchant app (iOS) <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={() => download("Merchant app (Android)")}>
                Merchant app (Android) <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={() => download("Desktop dashboard")}>
                Desktop dashboard <span className="text-xs text-muted-foreground">v1.5.2</span>
              </Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
