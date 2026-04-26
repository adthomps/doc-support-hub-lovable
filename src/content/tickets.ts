export type TicketStatus = "open" | "in_progress" | "waiting_on_you" | "resolved" | "closed"

export type TicketEvent = {
  at: string
  by: "you" | "support" | "system"
  message: string
}

export type Ticket = {
  id: string
  email: string
  subject: string
  category: string
  status: TicketStatus
  priority: "Standard" | "Priority" | "Critical"
  createdAt: string
  updatedAt: string
  assignee?: string
  events: TicketEvent[]
}

export const tickets: Ticket[] = [
  {
    id: "TCK-10241",
    email: "jane@example.com",
    subject: "Payout delayed for April 18",
    category: "billing",
    status: "in_progress",
    priority: "Priority",
    createdAt: "2025-04-19T09:12:00Z",
    updatedAt: "2025-04-22T14:03:00Z",
    assignee: "Marcus (Payouts)",
    events: [
      { at: "2025-04-19T09:12:00Z", by: "you", message: "Submitted request: payout did not arrive on April 18." },
      { at: "2025-04-19T11:40:00Z", by: "system", message: "Routed to the Payouts team." },
      { at: "2025-04-20T08:05:00Z", by: "support", message: "Investigating with the bank partner." },
      { at: "2025-04-22T14:03:00Z", by: "support", message: "Bank confirmed funds will settle April 24." },
    ],
  },
  {
    id: "TCK-10198",
    email: "jane@example.com",
    subject: "API key rotation question",
    category: "technical",
    status: "waiting_on_you",
    priority: "Standard",
    createdAt: "2025-04-15T16:22:00Z",
    updatedAt: "2025-04-21T10:11:00Z",
    assignee: "Priya (Developer Support)",
    events: [
      { at: "2025-04-15T16:22:00Z", by: "you", message: "How do I rotate keys without downtime?" },
      { at: "2025-04-16T09:00:00Z", by: "support", message: "Shared rotation guide. Can you confirm your SDK version?" },
      { at: "2025-04-21T10:11:00Z", by: "support", message: "Bumping — awaiting your SDK version." },
    ],
  },
  {
    id: "TCK-10077",
    email: "alex@partner.io",
    subject: "Add new sub-account",
    category: "partner",
    status: "resolved",
    priority: "Standard",
    createdAt: "2025-04-02T13:45:00Z",
    updatedAt: "2025-04-04T17:20:00Z",
    assignee: "Sara (Partner Ops)",
    events: [
      { at: "2025-04-02T13:45:00Z", by: "you", message: "Need to add merchant Acme Co. under partner ID PRT-220." },
      { at: "2025-04-03T10:30:00Z", by: "support", message: "Created sub-account, sent invite to admin@acme.co." },
      { at: "2025-04-04T17:20:00Z", by: "you", message: "Confirmed access. Thanks!" },
      { at: "2025-04-04T17:20:00Z", by: "system", message: "Ticket marked resolved." },
    ],
  },
  {
    id: "TCK-09903",
    email: "sam@example.com",
    subject: "Card payments failing in dashboard",
    category: "technical",
    status: "open",
    priority: "Critical",
    createdAt: "2025-04-23T07:01:00Z",
    updatedAt: "2025-04-23T07:01:00Z",
    events: [
      { at: "2025-04-23T07:01:00Z", by: "you", message: "All card payments returning 502 since 06:50 UTC." },
      { at: "2025-04-23T07:02:00Z", by: "system", message: "Escalated to on-call engineering." },
    ],
  },
]

export const statusLabel: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  waiting_on_you: "Waiting on you",
  resolved: "Resolved",
  closed: "Closed",
}

export function statusVariant(s: TicketStatus): "accent" | "success" | "warning" | "muted" | "default" {
  switch (s) {
    case "open": return "accent"
    case "in_progress": return "accent"
    case "waiting_on_you": return "warning"
    case "resolved": return "success"
    case "closed": return "muted"
  }
}

export function findTickets(input: string): Ticket[] {
  const q = input.trim().toLowerCase()
  if (!q) return []
  return tickets.filter(
    (t) => t.id.toLowerCase() === q || t.id.toLowerCase().includes(q) || t.email.toLowerCase() === q
  )
}
