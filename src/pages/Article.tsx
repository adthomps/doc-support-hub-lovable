import { Link, useParams, Navigate } from "react-router-dom"
import { Clock, ArrowRight, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useArticleFeedback } from "@/hooks/useArticleFeedback"
import { findArticle, articlesByAudience, personasByAudience, type Audience, type ArticleBlock } from "@/content/articles"

const audienceLabel: Record<Audience, string> = {
  developers: "Developers",
  businesses: "Businesses",
  resellers: "Resellers",
}

function Block({ b }: { b: ArticleBlock }) {
  switch (b.type) {
    case "p":
      return <p className="text-sm leading-relaxed text-foreground">{b.text}</p>
    case "h2":
      return <h2 className="text-lg font-semibold text-foreground mt-2">{b.text}</h2>
    case "ul":
      return <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground">{b.items.map((i, k) => <li key={k}>{i}</li>)}</ul>
    case "ol":
      return <ol className="list-decimal list-inside space-y-1.5 text-sm text-foreground">{b.items.map((i, k) => <li key={k}>{i}</li>)}</ol>
    case "code":
      return (
        <div className="rounded-md border border-border bg-surface">
          <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">{b.lang ?? "code"}</div>
          <pre className="overflow-x-auto p-3 text-xs"><code className="font-mono text-foreground">{b.text}</code></pre>
        </div>
      )
    case "callout":
      return (
        <AptCard variant={b.tone === "warning" ? "elevated" : "subtle"} padding="dense">
          <div className="flex items-start gap-2">
            <AptTag variant={b.tone === "warning" ? "warning" : b.tone === "success" ? "success" : "accent"}>
              {b.tone === "warning" ? "Warning" : b.tone === "success" ? "Tip" : "Info"}
            </AptTag>
            <p className="text-sm text-foreground leading-relaxed">{b.text}</p>
          </div>
        </AptCard>
      )
  }
}

export default function Article() {
  const { audience, slug } = useParams<{ audience: string; slug: string }>()
  const validAudiences: Audience[] = ["developers", "businesses", "resellers"]
  if (!audience || !validAudiences.includes(audience as Audience)) {
    return <Navigate to="/" replace />
  }
  const aud = audience as Audience
  const article = slug ? findArticle(aud, slug) : undefined

  if (!article) {
    return (
      <AptSection spacing="compact" width="wide">
        <EmptyState
          title="Article not found"
          description={`We couldn't find an article at /${audience}/articles/${slug}. It may have moved or been retired.`}
          action={
            <Button variant="accent" asChild>
              <Link to={`/${aud}`}>Back to {audienceLabel[aud]}</Link>
            </Button>
          }
        />
      </AptSection>
    )
  }

  const related = articlesByAudience(aud).filter((a) => a.slug !== article.slug).slice(0, 3)
  const { entry, vote, setVote, clear } = useArticleFeedback(aud, article.slug)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState("")

  useEffect(() => {
    setComment(entry?.comment ?? "")
    setShowComment(false)
  }, [entry?.vote, article.slug])

  const cast = (v: "up" | "down") => {
    setVote(v, comment)
    toast.success(v === "up" ? "Thanks — feedback saved" : "Thanks — we'll use this to improve")
  }
  const saveComment = () => {
    if (!entry) return
    setVote(entry.vote, comment)
    setShowComment(false)
    toast.success("Comment saved")
  }
  const reset = () => {
    clear()
    setComment("")
    setShowComment(false)
    toast.info("Feedback cleared")
  }

  return (
    <AptSection spacing="compact" width="wide">
      <div className="grid lg:grid-cols-3 gap-6">
        <article className="lg:col-span-2 space-y-6">
          <AptCard variant="hero" padding="feature">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <AptTag variant="accent">{audienceLabel[aud]}</AptTag>
              <AptTag variant="muted">{article.categoryLabel}</AptTag>
              {article.personas?.map((pid) => {
                const meta = personasByAudience[aud].find((p) => p.id === pid)
                return meta ? <AptTag key={pid} variant="default">{meta.label}</AptTag> : null
              })}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{article.title}</h1>
            <p className="text-base text-muted-foreground mt-2 leading-relaxed">{article.summary}</p>
            <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{article.readTime}</span>
              <span>•</span>
              <span>Updated {article.updated}</span>
            </div>
          </AptCard>

          <AptCard variant="default">
            <AptCardContent className="space-y-4">
              {article.body.map((b, i) => <Block key={i} b={b} />)}
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle" padding="dense">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-foreground">Was this article helpful?</p>
                  {entry && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      You voted {entry.vote === "up" ? "Yes" : "No"} on {new Date(entry.at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant={entry?.vote === "up" ? "accent" : "outline"} size="sm" onClick={() => cast("up")}>
                    <ThumbsUp className="h-3.5 w-3.5 mr-1.5" /> Yes
                  </Button>
                  <Button variant={entry?.vote === "down" ? "accent" : "outline"} size="sm" onClick={() => cast("down")}>
                    <ThumbsDown className="h-3.5 w-3.5 mr-1.5" /> No
                  </Button>
                  {entry && (
                    <Button variant="ghost" size="sm" onClick={reset} aria-label="Clear feedback">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {entry && !showComment && !entry.comment && (
                <Button variant="ghost" size="sm" onClick={() => setShowComment(true)}>
                  Add a comment
                </Button>
              )}
              {entry && entry.comment && !showComment && (
                <div className="rounded-md border border-border bg-background p-3">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Your comment</p>
                  <p className="text-sm text-foreground">{entry.comment}</p>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowComment(true)}>Edit</Button>
                </div>
              )}
              {entry && showComment && (
                <div className="space-y-2">
                  <Textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value.slice(0, 500))}
                    placeholder="Tell us what worked or what was missing (optional)"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{comment.length}/500</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setShowComment(false)}>Cancel</Button>
                      <Button variant="accent" size="sm" onClick={saveComment}>Save</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AptCard>
        </article>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Need more help?</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full" asChild>
                <Link to="/support">Contact support</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/faq">Browse FAQs</Link>
              </Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base">Related articles</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              {related.length === 0 ? (
                <p className="text-sm text-muted-foreground">No related articles yet.</p>
              ) : (
                related.map((r) => (
                  <Link key={r.slug} to={`/${aud}/articles/${r.slug}`} className="block">
                    <AptCard variant="interactive" padding="dense" className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.readTime}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </AptCard>
                  </Link>
                ))
              )}
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
