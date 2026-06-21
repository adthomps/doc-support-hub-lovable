export type SurfaceStatus = "stable" | "internal" | "preview"

export type ApiSurface = {
  id: string
  name: string
  purpose: string
  users: string
  status: SurfaceStatus
  path: string
}

export const apiSurfaces: ApiSurface[] = [
  {
    id: "rest",
    name: "REST API",
    purpose: "Public merchant, developer, and partner contract. Stable, versioned, OpenAPI-described.",
    users: "External developers, SDKs, merchants, platforms",
    status: "stable",
    path: "/api/rest",
  },
  {
    id: "rpc",
    name: "JSON-RPC API",
    purpose: "Internal command engine for orchestration, adapters, AI tools, and batch operations.",
    users: "Internal services, adapters, AI tools, advanced workflows",
    status: "internal",
    path: "/api/rpc",
  },
  {
    id: "events",
    name: "Webhooks / Events",
    purpose: "Async lifecycle notifications using a CloudEvents-style envelope.",
    users: "Merchants, partners, automation systems",
    status: "stable",
    path: "/api/events",
  },
  {
    id: "ai-tools",
    name: "AI Tool / MCP Layer",
    purpose: "Governed AI access to selected capabilities with approval and scope boundaries.",
    users: "AI assistants, support agents, copilots",
    status: "preview",
    path: "/api/ai-tools",
  },
  {
    id: "graphql",
    name: "GraphQL / Persisted Queries",
    purpose: "Internal UI aggregation and reporting. Not part of the public contract.",
    users: "Admin UI, dashboards, support tools",
    status: "internal",
    path: "/api/rest",
  },
]

export const guidingPrinciple =
  "REST is the public contract. JSON-RPC is the command engine. Events are the truth trail. AI tools are the governed automation layer."
