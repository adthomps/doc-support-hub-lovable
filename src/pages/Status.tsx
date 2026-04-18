import { useMemo } from "react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag, type AptTagProps } from "@/components/apt/AptTag"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type Status = "operational" | "degraded" | "down"

const services: { name: string; status: Status }[] = [
  { name: "API", status: "operational" },
  { name: "Dashboard", status: "operational" },
  { name: "Webhooks", status: "operational" },
  { name: "Payments", status: "degraded" },
  { name: "Auth", status: "operational" },
  { name: "Docs", status: "operational" },
]

const statusVariant: Record<Status, AptTagProps["variant"]> = {
  operational: "success",
  degraded: "warning",
  down: "warning",
}

const statusLabel: Record<Status, string> = {
  operational: "Operational",
  degraded: "Degraded",
  down: "Outage",
}

const incidents = [
  {
    id: "i-1",
    title: "Elevated latency on Payments API",
    date: "2025-04-15",
    status: "Investigating",
    body: "We are observing intermittent latency on /v1/charges. Engineers are investigating; no failed transactions detected.",
  },
  {
    id: "i-2",
    title: "Webhook delivery delays — resolved",
    date: "2025-04-10",
    status: "Resolved",
    body: "A queue backlog caused up to 6 minute delivery delays. All webhooks were delivered. Root cause: noisy neighbor on the queue worker fleet.",
  },
  {
    id: "i-3",
    title: "Dashboard login failures — resolved",
    date: "2025-04-02",
    status: "Resolved",
    body: "Dashboard SSO failed for a subset of users for 12 minutes. Mitigated by failover.",
  },
]

function Sparkline({ status }: { status: Status }) {
  const bars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      // mostly operational; some degraded for the degraded service
      if (status === "degraded" && (i === 18 || i === 19 || i === 41)) return "degraded" as Status
      return "operational" as Status
    })
  }, [status])

  return (
    <div className="flex items-end gap-[2px] h-6 w-full">
      {bars.map((b, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${b === "operational" ? "bg-success/70" : b === "degraded" ? "bg-warning/70" : "bg-destructive/70"}`}
          style={{ height: "100%" }}
          title={`Day ${i + 1}: ${statusLabel[b]}`}
        />
      ))}
    </div>
  )
}

export default function Status() {
  const allOperational = services.every((s) => s.status === "operational")

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Support"
      title="System status"
      description="Live status of platform services and recent incidents."
    >
      <div className="space-y-6">
        <AptCard variant={allOperational ? "feature" : "elevated"}>
          <AptCardContent className="p-6 flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${allOperational ? "bg-success" : "bg-warning"}`} />
            <span className="text-base font-semibold text-foreground">
              {allOperational ? "All systems operational" : "Some systems experiencing issues"}
            </span>
            <AptTag variant="muted" className="ml-auto">Updated just now</AptTag>
          </AptCardContent>
        </AptCard>

        <AptCard variant="default">
          <AptCardHeader>
            <AptCardTitle>Services</AptCardTitle>
          </AptCardHeader>
          <AptCardContent className="space-y-3">
            {services.map((s) => (
              <AptCard key={s.name} variant="subtle" padding="dense" className="grid grid-cols-[1fr_auto] sm:grid-cols-[160px_1fr_auto] items-center gap-4">
                <div className="text-sm font-medium text-foreground">{s.name}</div>
                <div className="hidden sm:block"><Sparkline status={s.status} /></div>
                <AptTag variant={statusVariant[s.status]}>{statusLabel[s.status]}</AptTag>
              </AptCard>
            ))}
            <p className="text-xs text-muted-foreground">90-day uptime — newest on the right.</p>
          </AptCardContent>
        </AptCard>

        <AptCard variant="default" padding="none">
          <AptCardHeader>
            <AptCardTitle>Recent incidents</AptCardTitle>
          </AptCardHeader>
          <AptCardContent>
            <Accordion type="single" collapsible>
              {incidents.map((inc) => (
                <AccordionItem key={inc.id} value={inc.id} className="border-border last:border-0">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 flex-1 text-left">
                      <AptTag variant={inc.status === "Resolved" ? "success" : "warning"}>{inc.status}</AptTag>
                      <span className="text-sm font-medium text-foreground">{inc.title}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{inc.date}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {inc.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AptCardContent>
        </AptCard>
      </div>
    </AptSection>
  )
}
