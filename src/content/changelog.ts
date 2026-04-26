import type { AptTagProps } from "@/components/apt/AptTag"

export type Kind = "Feature" | "Fix" | "Breaking" | "Improvement" | "Security"
export type Area = "API" | "UI" | "App" | "Mobile" | "Docs" | "Infra" | "SDK"

export type Release = {
  version: string
  date: string
  kind: Kind
  area: Area
  title: string
  notes: string[]
}

export const releases: Release[] = [
  { version: "v2.5.1", date: "2025-04-22", kind: "Improvement", area: "UI", title: "Redesigned dashboard navigation", notes: ["New collapsible sidebar with keyboard shortcuts.", "Improved focus states across navigation links."] },
  { version: "v2.5.0", date: "2025-04-18", kind: "Feature", area: "Mobile", title: "Push notifications on iOS & Android", notes: ["Opt-in per device in Settings → Notifications.", "Granular categories: payouts, disputes, security."] },
  { version: "v2.4.2", date: "2025-04-15", kind: "Security", area: "Infra", title: "Rotated TLS certificates", notes: ["All edge certificates rotated ahead of expiry.", "No customer action required."] },
  { version: "v2.4.0", date: "2025-04-12", kind: "Feature", area: "API", title: "Webhook signing with HMAC-SHA256", notes: ["All webhook payloads now include an X-Signature header.", "Legacy unsigned webhooks remain supported until v3.0."] },
  { version: "v2.3.5", date: "2025-04-08", kind: "Fix", area: "App", title: "Merchant app crash on dispute upload", notes: ["Fixed a crash when uploading evidence > 10MB.", "Added clearer file-size error message."] },
  { version: "v2.3.4", date: "2025-04-06", kind: "Improvement", area: "Docs", title: "Searchable API reference", notes: ["New keyword search across all endpoints.", "Endpoint examples now include curl, JS, and Python."] },
  { version: "v2.3.2", date: "2025-04-03", kind: "Fix", area: "API", title: "Payout pagination cursor edge case", notes: ["Fixed cursor returning duplicates on the final page.", "Added regression tests."] },
  { version: "v2.3.1", date: "2025-03-28", kind: "Fix", area: "UI", title: "Dark-mode contrast on disabled buttons", notes: ["Disabled buttons now meet WCAG AA contrast in dark mode."] },
  { version: "v2.3.0", date: "2025-03-21", kind: "Feature", area: "API", title: "New disputes API", notes: ["List, retrieve, and respond to disputes programmatically.", "Webhook events: dispute.created, dispute.updated."] },
  { version: "v2.2.3", date: "2025-03-12", kind: "Improvement", area: "SDK", title: "Node SDK v3 with native fetch", notes: ["Drops node-fetch dependency.", "Smaller install footprint."] },
  { version: "v2.2.0", date: "2025-03-04", kind: "Breaking", area: "API", title: "Removed deprecated /v1/legacy_users", notes: ["Use /v1/users with filter[type]=legacy instead.", "Migration guide available in the docs."] },
  { version: "v2.1.4", date: "2025-02-19", kind: "Fix", area: "UI", title: "Dashboard filter persistence", notes: ["Filters now persist across page reloads."] },
  { version: "v2.1.2", date: "2025-02-10", kind: "Improvement", area: "App", title: "Faster onboarding flow", notes: ["Reduced steps from 8 to 5.", "Auto-saves progress on each step."] },
  { version: "v2.1.0", date: "2025-02-02", kind: "Feature", area: "API", title: "Multi-currency payouts", notes: ["Receive payouts in 12 new currencies.", "FX rates locked at payout creation."] },
  { version: "v2.0.2", date: "2025-01-22", kind: "Security", area: "App", title: "Two-factor enforcement for admins", notes: ["Workspace owners can require 2FA for admin roles."] },
  { version: "v2.0.1", date: "2025-01-15", kind: "Fix", area: "API", title: "OAuth refresh token rotation", notes: ["Refresh tokens now rotate on every use."] },
]

export const kindVariant: Record<Kind, AptTagProps["variant"]> = {
  Feature: "accent",
  Fix: "success",
  Breaking: "warning",
  Improvement: "default",
  Security: "warning",
}

export const areaVariant: Record<Area, AptTagProps["variant"]> = {
  API: "accent",
  UI: "default",
  App: "default",
  Mobile: "default",
  Docs: "muted",
  Infra: "muted",
  SDK: "default",
}
