import { Link } from "react-router-dom"
import { BookOpen, HelpCircle, Megaphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import { useArticleFilters, ArticleFiltersBar } from "@/hooks/useArticleFilters"
import { articlesByAudience, categoriesFor } from "@/content/articles"

export default function Resellers() {
  const articles = articlesByAudience("resellers")
  const categories = categoriesFor("resellers")
  const filters = useArticleFilters(articles)
  const supportLink = "/support?category=partner"

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Resellers"
      title="Reseller & partner hub"
      description="Guides, program information, and support for resellers and channel partners. For the live partner portal, sign in to your partner account."
      actions={<AptTag>Partner</AptTag>}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" /> Partner guides
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <ArticleFiltersBar state={filters} />
              {filters.filtered.length === 0 ? (
                <EmptyState title="No matching guides" description="Try a different keyword or change the read-time filter." />
              ) : (
                <div className="space-y-2">
                  {filters.filtered.map((g) => (
                    <Link key={g.slug} to={`/resellers/articles/${g.slug}`}>
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
              <AptCardTitle>Browse by category</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <Link key={c.slug} to={`/resellers/category/${c.slug}`}>
                    <AptCard variant="interactive" padding="dense">
                      <h3 className="text-sm font-semibold text-foreground mb-1">{c.label}</h3>
                      <AptTag variant="muted">{c.count} article{c.count === 1 ? "" : "s"}</AptTag>
                    </AptCard>
                  </Link>
                ))}
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-muted-foreground" /> Program at a glance
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <dl className="grid sm:grid-cols-3 gap-4">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tiers</dt>
                  <dd className="mt-1 text-sm text-foreground">Authorized, Silver, Gold</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Commission</dt>
                  <dd className="mt-1 text-sm text-foreground">Tier-based, paid monthly</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Onboarding</dt>
                  <dd className="mt-1 text-sm text-foreground">Agreement + training module</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Detailed terms, certification paths, and marketing assets live inside the partner portal after onboarding.
              </p>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Partner support</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full" asChild>
                <Link to={supportLink}>Contact partner support</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to={supportLink}>Submit a partner request</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/support?category=partner&topic=track">Track a ticket</Link>
              </Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> Common partner questions
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">How do I become a partner?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Review the onboarding guide and sign the partner agreement.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">When are commissions paid?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly in arrears, based on net revenue from managed accounts.</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/faq">View all FAQs</Link>
              </Button>
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
