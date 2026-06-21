import { useMemo, useState } from "react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { EmptyState } from "@/components/apt/EmptyState"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { releases, kindVariant, areaVariant, type Kind, type Area } from "@/content/changelog"

const kindFilters: ("All" | Kind)[] = ["All", "Feature", "Improvement", "Fix", "Security", "Breaking"]
const areaFilters: ("All" | Area)[] = ["All", "API", "UI", "App", "Mobile", "SDK", "Docs", "Infra"]

export default function Changelog() {
  const [kind, setKind] = useState<(typeof kindFilters)[number]>("All")
  const [area, setArea] = useState<(typeof areaFilters)[number]>("All")
  const [query, setQuery] = useState("")

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return releases.filter((r) => {
      if (kind !== "All" && r.kind !== kind) return false
      if (area !== "All" && r.area !== area) return false
      if (!q) return true
      return (
        r.title.toLowerCase().includes(q) ||
        r.version.toLowerCase().includes(q) ||
        r.notes.some((n) => n.toLowerCase().includes(q))
      )
    })
  }, [kind, area, query])

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Resources"
      title="Changelog"
      description="Recent platform updates across the API, apps, UI, SDKs, and docs."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search releases by title, version, or notes…"
            className="max-w-md"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground mr-1">Type</span>
            {kindFilters.map((f) => (
              <button key={f} onClick={() => setKind(f)} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                <AptTag variant={kind === f ? "accent" : "muted"} className="cursor-pointer">{f}</AptTag>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground mr-1">Area</span>
            {areaFilters.map((f) => (
              <button key={f} onClick={() => setArea(f)} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
                <AptTag variant={area === f ? "accent" : "muted"} className="cursor-pointer">{f}</AptTag>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{visible.length} of {releases.length} releases</p>
        </div>

      {visible.length === 0 ? (
        <EmptyState title="No matching releases" description="Try clearing filters or adjusting your search." />
      ) : (
        <Accordion type="multiple" className="space-y-3">
          {visible.map((r) => (
            <AptCard key={r.version} variant="default" padding="none">
              <AccordionItem value={r.version} className="border-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 flex-1 text-left flex-wrap">
                    <AptTag variant={kindVariant[r.kind]}>{r.kind}</AptTag>
                    <AptTag variant={areaVariant[r.area]}>{r.area}</AptTag>
                    <span className="text-sm font-mono text-muted-foreground">{r.version}</span>
                    <span className="text-sm font-medium text-foreground">{r.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <AptCardContent className="p-0">
                    <ul className="space-y-1.5 list-disc list-inside text-sm text-muted-foreground leading-relaxed">
                      {r.notes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  </AptCardContent>
                </AccordionContent>
              </AccordionItem>
            </AptCard>
          ))}
        </Accordion>
      )}
    </AptSection>
  )
}
