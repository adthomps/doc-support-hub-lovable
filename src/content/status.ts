import type { AptTagProps } from "@/components/apt/AptTag"

export type ServiceStatus = "operational" | "degraded" | "down"

export const services: { name: string; status: ServiceStatus }[] = [
  { name: "API", status: "operational" },
  { name: "Dashboard", status: "operational" },
  { name: "Webhooks", status: "operational" },
  { name: "Payments", status: "degraded" },
  { name: "Auth", status: "operational" },
  { name: "Docs", status: "operational" },
]

export const statusVariant: Record<ServiceStatus, AptTagProps["variant"]> = {
  operational: "success",
  degraded: "warning",
  down: "warning",
}

export const statusLabel: Record<ServiceStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  down: "Outage",
}

export const incidents = [
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

export const overallStatus = (): ServiceStatus =>
  services.some((s) => s.status === "down") ? "down" : services.some((s) => s.status === "degraded") ? "degraded" : "operational"
