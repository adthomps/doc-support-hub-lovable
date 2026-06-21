export type Adr = {
  id: string
  title: string
  status: "accepted" | "proposed" | "superseded"
  context: string
  decision: string
  consequences: string[]
  related?: string[]
}

export const adrs: Adr[] = [
  {
    id: "ADR-001",
    title: "API Surface Strategy",
    status: "accepted",
    context:
      "We support external developers, merchants, partners, internal services, admin tooling, AI agents, and provider adapters. A single API style cannot serve all of them well.",
    decision:
      "Adopt a multi-surface architecture: REST as the public contract, JSON-RPC as the internal command engine, events as the truth trail, AI tools as a governed automation layer, and GraphQL (internal-only) for UI aggregation.",
    consequences: [
      "External developers see a stable, OpenAPI-described REST API.",
      "Internal services orchestrate via versioned JSON-RPC methods.",
      "AI access flows through curated tools, not raw provider calls.",
      "Each surface evolves independently with its own governance.",
    ],
    related: ["ADR-002", "ADR-003"],
  },
  {
    id: "ADR-002",
    title: "REST as Public Contract",
    status: "accepted",
    context: "External merchants, partners, SDK authors, and support teams need a stable, predictable, well-documented surface.",
    decision:
      "All public-facing capabilities are exposed as resource-oriented REST endpoints under `/v1/*`, described by OpenAPI 3.1 with shared error envelope and ID prefixes.",
    consequences: [
      "Public capabilities are durable; internal refactors do not break customers.",
      "OpenAPI feeds SDK generation, Postman collections, and AI specs.",
      "JSON-RPC methods stay private unless intentionally promoted.",
    ],
    related: ["ADR-001", "ADR-010"],
  },
  {
    id: "ADR-003",
    title: "JSON-RPC as Internal Command Layer",
    status: "accepted",
    context: "Internal orchestration needs verb-oriented commands, provider abstraction, batch operations, and AI-tool callability.",
    decision:
      "Internal services and adapters speak JSON-RPC 2.0 with `domain.action` naming. Each method declares owner, schema, scope, side-effect class, idempotency, and approval requirements.",
    consequences: [
      "AI tools call governed RPC methods, not raw provider APIs.",
      "Provider adapters live under `provider.<name>.*` and stay internal.",
      "REST handlers stay thin and delegate to commands.",
    ],
    related: ["ADR-001", "ADR-006"],
  },
  {
    id: "ADR-004",
    title: "Event/Webhook Model",
    status: "accepted",
    context: "Lifecycle changes must reach merchants and automation systems without polling.",
    decision:
      "Use a CloudEvents-style envelope. Endpoints register with subscriptions and a rotating signing secret. Deliveries are retried with exponential backoff and exposed via a delivery log and manual replay.",
    consequences: [
      "Merchants build event-driven integrations.",
      "Failed deliveries are auditable and replayable.",
      "The event log is the source of truth for past lifecycle changes.",
    ],
    related: ["ADR-001"],
  },
  {
    id: "ADR-005",
    title: "AI Tool Access Model",
    status: "accepted",
    context: "AI assistants should accelerate work without becoming an unsupervised channel for money movement.",
    decision:
      "AI clients use a governed tool layer. Tools default to read-only, explain-only, validate-only, or draft-only. Money movement and security-sensitive tools require explicit human approval and audit events.",
    consequences: [
      "AI access can be expanded safely, one tool at a time.",
      "Approvals and audits are uniform across the platform.",
      "Raw payment APIs are never exposed directly to AI by default.",
    ],
    related: ["ADR-001", "ADR-008"],
  },
  {
    id: "ADR-006",
    title: "Provider Adapter Boundary",
    status: "accepted",
    context: "Multiple processors (Cybersource and future providers) must be supported without leaking provider shape into the public API.",
    decision:
      "Provider adapters live under `src/providers/<name>/` and `provider.<name>.*` RPC methods. They translate normalized commands into provider requests and normalize responses. Raw provider fields are never returned by REST except as controlled diagnostic metadata.",
    consequences: [
      "Providers can be swapped or added without changing public REST.",
      "Diagnostics include processor response codes but not raw bodies.",
    ],
    related: ["ADR-003", "ADR-007"],
  },
  {
    id: "ADR-007",
    title: "Compatibility Layer Strategy",
    status: "accepted",
    context: "Legacy clients (Authorize.net-shaped, Cybersource-shaped) need a migration path without polluting the future-facing API.",
    decision:
      "Compatibility logic lives under `src/compat/<legacy>/` and `compat.<legacy>.*` RPC methods. Legacy shapes are accepted at the edge and translated into normalized commands.",
    consequences: [
      "Legacy clients keep working during migration.",
      "Compatibility shapes never leak into the public REST model.",
    ],
    related: ["ADR-006"],
  },
  {
    id: "ADR-008",
    title: "Authentication and Authorization Model",
    status: "accepted",
    context: "We must support merchants, platforms, partners, internal services, and AI tools with different trust levels.",
    decision:
      "Support OAuth/OIDC for user-delegated access, API keys for server-to-server, short-lived tokens where possible, and scoped access tokens. Roles map to scopes; merchant/account boundaries are enforced server-side. Optional mTLS for high-risk partners.",
    consequences: [
      "Scopes are fine-grained and uniform across surfaces.",
      "AI tools require dedicated scopes (`ai_tools:*`).",
      "High-risk actions can require sender-constrained credentials.",
    ],
    related: ["ADR-005"],
  },
  {
    id: "ADR-009",
    title: "Idempotency and Retry Policy",
    status: "accepted",
    context: "Money-moving operations must tolerate client retries without duplicate side effects.",
    decision:
      "REST money-moving endpoints require `Idempotency-Key`. JSON-RPC equivalents require `idempotency_key` in params. Keys are scoped per merchant and stored with the response for replay.",
    consequences: [
      "Clients can retry safely on network errors.",
      "Idempotency conflicts surface as a distinct error code.",
    ],
    related: ["ADR-002", "ADR-010"],
  },
  {
    id: "ADR-010",
    title: "Error Model",
    status: "accepted",
    context: "Errors must be predictable across REST, JSON-RPC, AI tools, and webhooks.",
    decision:
      "Use a single error envelope with `code`, `message`, `type`, `request_id`, and optional `details`, `documentation_url`, `retryable`, `field_errors`. JSON-RPC mirrors REST codes via numeric `code` plus `data.error_code`.",
    consequences: [
      "Clients write one error handler.",
      "Support tooling can correlate REST and RPC failures.",
    ],
    related: ["ADR-002", "ADR-003"],
  },
]
