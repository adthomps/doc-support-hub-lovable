import { useMemo, useState } from "react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardContent } from "@/components/apt/AptCard"
import { AptTag, type AptTagProps } from "@/components/apt/AptTag"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Kind = "Feature" | "Fix" | "Breaking"
type Release = { version: string; date: string; kind: Kind; title: string; notes: string[] }

const releases: Release[] = [
  { version: "v2.4.0", date: "2025-04-12", kind: "Feature", title: "Webhook signing with HMAC-SHA256", notes: ["All webhook payloads now include an X-Signature header.", "Legacy unsigned webhooks remain supported until v3.0."] },
  { version: "v2.3.2", date: "2025-04-03", kind: "Fix", title: "Payout pagination cursor edge case", notes: ["Fixed cursor returning duplicates on the final page.", "Added regression tests."] },
  { version: "v2.3.0", date: "2025-03-21", kind: "Feature", title: "New disputes API", notes: ["List, retrieve, and respond to disputes programmatically.", "Webhook events: dispute.created, dispute.updated."] },
  { version: "v2.2.0", date: "2025-03-04", kind: "Breaking", title: "Removed deprecated /v1/legacy_users", notes: ["Use /v1/users with filter[type]=legacy instead.", "Migration guide available in the docs."] },
  { version: "v2.1.4", date: "2025-02-19", kind: "Fix", title: "Dashboard filter persistence", notes: ["Filters now persist across page reloads."] },
  { version: "v2.1.0", date: "2025-02-02", kind: "Feature", title: "Multi-currency payouts", notes: ["Receive payouts in 12 new currencies.", "FX rates locked at payout creation."] },
  { version: "v2.0.1", date: "2025-01-15", kind: "Fix", title: "OAuth refresh token rotation", notes: ["Refresh tokens now rotate on every use."] },
]

const kindVariant: Record<Kind, AptTagProps["variant"]> = {
  Feature: "accent",
  Fix: "success",
  Breaking: "warning",
}

const filters: ("All" | Kind)[] = ["All", "Feature", "Fix", "Breaking"]

export default function Changelog() {
  const [active, setActive] = useState<(typeof filters)[number]>("All")

  const visible = useMemo(
    () => (active === "All" ? releases : releases.filter((r) => r.kind === active)),
    [active]
  )

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Resources"
      title="Changelog"
      description="Recent platform updates, fixes, and breaking changes."
    >
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            <AptTag variant={active === f ? "accent" : "muted"} className="cursor-pointer">
              {f}
            </AptTag>
          </button>
        ))}
      </div>

      <Accordion type="multiple" className="space-y-3">
        {visible.map((r) => (
          <AptCard key={r.version} variant="default" padding="none">
            <AccordionItem value={r.version} className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3 flex-1 text-left">
                  <AptTag variant={kindVariant[r.kind]}>{r.kind}</AptTag>
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
    </AptSection>
  )
}
