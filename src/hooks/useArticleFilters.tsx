import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AptTag } from "@/components/apt/AptTag"
import type { Article } from "@/content/articles"

export type ReadTimeBucket = "all" | "short" | "medium" | "long"

const buckets: { id: ReadTimeBucket; label: string; test: (m: number) => boolean }[] = [
  { id: "all", label: "Any length", test: () => true },
  { id: "short", label: "≤ 4 min", test: (m) => m <= 4 },
  { id: "medium", label: "5–6 min", test: (m) => m >= 5 && m <= 6 },
  { id: "long", label: "7+ min", test: (m) => m >= 7 },
]

const parseMinutes = (rt: string) => {
  const n = parseInt(rt, 10)
  return Number.isFinite(n) ? n : 0
}

export type ArticleFiltersState = {
  query: string
  setQuery: (s: string) => void
  bucket: ReadTimeBucket
  setBucket: (b: ReadTimeBucket) => void
  reset: () => void
  filtered: Article[]
  total: number
}

export function useArticleFilters(source: Article[]): ArticleFiltersState {
  const [query, setQuery] = useState("")
  const [bucket, setBucket] = useState<ReadTimeBucket>("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const b = buckets.find((x) => x.id === bucket)!
    return source.filter((a) => {
      if (!b.test(parseMinutes(a.readTime))) return false
      if (!q) return true
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.categoryLabel.toLowerCase().includes(q)
      )
    })
  }, [source, query, bucket])

  return {
    query,
    setQuery,
    bucket,
    setBucket,
    reset: () => {
      setQuery("")
      setBucket("all")
    },
    filtered,
    total: source.length,
  }
}

export function ArticleFiltersBar({ state }: { state: ArticleFiltersState }) {
  const active = state.query.trim() !== "" || state.bucket !== "all"
  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={state.query}
            onChange={(e) => state.setQuery(e.target.value)}
            placeholder="Search articles…"
            className="pl-8"
            aria-label="Search articles"
          />
        </div>
        {active && (
          <Button variant="ghost" size="sm" onClick={state.reset}>
            <X className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground mr-1">Read time</span>
        {buckets.map((b) => (
          <button
            key={b.id}
            onClick={() => state.setBucket(b.id)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <AptTag variant={state.bucket === b.id ? "accent" : "muted"} className="cursor-pointer">
              {b.label}
            </AptTag>
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">
          {state.filtered.length} of {state.total}
        </span>
      </div>
    </div>
  )
}
