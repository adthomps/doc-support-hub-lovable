import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowRight, Clock } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import { Button } from "@/components/ui/button"
import { articlesByCategory, categoriesFor, type Audience } from "@/content/articles"

const audienceLabel: Record<Audience, string> = {
  developers: "Developers",
  businesses: "Businesses",
  resellers: "Resellers",
}

export default function CategoryIndex() {
  const { audience, categorySlug } = useParams<{ audience: string; categorySlug: string }>()
  const validAudiences: Audience[] = ["developers", "businesses", "resellers"]
  if (!audience || !validAudiences.includes(audience as Audience)) {
    return <Navigate to="/" replace />
  }
  const aud = audience as Audience
  const cat = categoriesFor(aud).find((c) => c.slug === categorySlug)
  const articles = categorySlug ? articlesByCategory(aud, categorySlug) : []

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow={audienceLabel[aud]}
      title={cat?.label ?? "Category"}
      description={cat ? `${cat.count} article${cat.count === 1 ? "" : "s"} in this category.` : undefined}
      actions={<AptTag>{audienceLabel[aud]}</AptTag>}
    >
      {articles.length === 0 ? (
        <EmptyState
          title="No articles yet"
          description="This category is empty. Check back soon or browse other categories."
          action={<Button variant="accent" asChild><Link to={`/${aud}`}>Back to {audienceLabel[aud]}</Link></Button>}
        />
      ) : (
        <AptCard variant="default">
          <AptCardHeader>
            <AptCardTitle>Articles</AptCardTitle>
          </AptCardHeader>
          <AptCardContent className="space-y-2">
            {articles.map((a) => (
              <Link key={a.slug} to={`/${aud}/articles/${a.slug}`}>
                <AptCard variant="interactive" padding="dense" className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-foreground">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{a.summary}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {a.readTime}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </AptCard>
              </Link>
            ))}
          </AptCardContent>
        </AptCard>
      )}
    </AptSection>
  )
}
