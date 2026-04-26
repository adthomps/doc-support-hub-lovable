import type { AptTagProps } from "@/components/apt/AptTag"

export type Kind = "Feature" | "Fix" | "Breaking"
export type Release = {
  version: string
  date: string
  kind: Kind
  title: string
  notes: string[]
}

export const releases: Release[] = [
  { version: "v2.4.0", date: "2025-04-12", kind: "Feature", title: "Webhook signing with HMAC-SHA256", notes: ["All webhook payloads now include an X-Signature header.", "Legacy unsigned webhooks remain supported until v3.0."] },
  { version: "v2.3.2", date: "2025-04-03", kind: "Fix", title: "Payout pagination cursor edge case", notes: ["Fixed cursor returning duplicates on the final page.", "Added regression tests."] },
  { version: "v2.3.0", date: "2025-03-21", kind: "Feature", title: "New disputes API", notes: ["List, retrieve, and respond to disputes programmatically.", "Webhook events: dispute.created, dispute.updated."] },
  { version: "v2.2.0", date: "2025-03-04", kind: "Breaking", title: "Removed deprecated /v1/legacy_users", notes: ["Use /v1/users with filter[type]=legacy instead.", "Migration guide available in the docs."] },
  { version: "v2.1.4", date: "2025-02-19", kind: "Fix", title: "Dashboard filter persistence", notes: ["Filters now persist across page reloads."] },
  { version: "v2.1.0", date: "2025-02-02", kind: "Feature", title: "Multi-currency payouts", notes: ["Receive payouts in 12 new currencies.", "FX rates locked at payout creation."] },
  { version: "v2.0.1", date: "2025-01-15", kind: "Fix", title: "OAuth refresh token rotation", notes: ["Refresh tokens now rotate on every use."] },
]

export const kindVariant: Record<Kind, AptTagProps["variant"]> = {
  Feature: "accent",
  Fix: "success",
  Breaking: "warning",
}
