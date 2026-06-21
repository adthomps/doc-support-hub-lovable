
# Plan: Align documentation with multi-surface API direction

This is a **documentation-only** refactor of the doc/support hub. No backend, no real APIs — we surface the architecture, examples, mock data, and ADRs as content + lightweight pages so developers, merchants, partners, and AI/agent users can navigate it.

Guiding line we'll put front-and-center:
> REST is the public contract. JSON-RPC is the command engine. Events are the truth trail. AI tools are the governed automation layer.

---

## 1. New content registry shape

Extend `src/content/articles.ts` (and add sibling files) so the hub can describe more than prose articles:

- `apiSurfaces.ts` — the 5 surfaces (REST, JSON-RPC, Webhooks/Events, AI Tools, GraphQL/internal) with purpose, users, status.
- `restResources.ts` — REST resource catalog (`payment-intents`, `transactions`, `refunds`, `customers`, `payment-methods`, `checkout/sessions`, `webhooks/endpoints`, `events`, `disputes`, `settlements`, `reports`, `api-keys`, `accounts`, `merchants`) with endpoints, scopes, idempotency flag, example request/response.
- `rpcMethods.ts` — JSON-RPC method catalog grouped by domain (`payment.*`, `transaction.*`, `customer.*`, `token.*`, `risk.*`, `webhook.*`, `settlement.*`, `provider.cybersource.*`, `compat.authorizenet.*`) with side-effect class, scopes, approval, idempotency, example envelope.
- `events.ts` — event catalog with CloudEvents-style sample payloads.
- `aiTools.ts` — AI tool catalog with permission scope, side-effect class, approval required, dry-run support.
- `errorCodes.ts` — unified error envelope + REST/RPC code tables.
- `scopes.ts` — auth scope catalog.
- `idStandards.ts` — ID prefix table.
- `adrs.ts` — ADR-001 … ADR-010 entries (status, context, decision, consequences).

Existing `articles.ts` keeps prose guides; new files power dedicated catalog pages.

## 2. New pages (under `src/pages/`)

All use existing `AptSection` / `AptCard` / `AptTag` primitives and the current spacing standard.

- `ApiOverview.tsx` — `/api` — surfaces matrix, boundary diagram (ASCII), external vs internal rules.
- `RestResources.tsx` — `/api/rest` — resource list + detail drawer/card with sample req/res and curl.
- `RpcMethods.tsx` — `/api/rpc` — JSON-RPC catalog with filters by domain, side-effect, approval.
- `Events.tsx` — `/api/events` — event types, envelope, webhook flow.
- `WebhooksGuide.tsx` — `/api/webhooks` — registration, signing, retry, replay (uses `/v1/webhooks/endpoints/...` examples).
- `AiTools.tsx` — `/api/ai-tools` — tool catalog + approval matrix + trust boundaries.
- `ErrorCatalog.tsx` — `/api/errors` — envelope + code tables (REST + JSON-RPC `-32xxx`).
- `Adrs.tsx` + `AdrDetail.tsx` — `/architecture/adrs` and `/architecture/adrs/:id`.
- `Compatibility.tsx` — `/api/compatibility` — Authorize.net / Cybersource mapping examples.
- Expand existing `ApiReference.tsx` to link into these (keep current endpoint groups; mark them as "REST v1 — public").

## 3. Mocks, samples, and sample files

Create `src/content/samples/` and `public/samples/` for downloadable artifacts:

- `public/samples/openapi.v1.yaml` — stub OpenAPI 3.1 with 3–4 representative resources (`payment-intents`, `refunds`, `webhooks/endpoints`, `events`) and the shared error schema.
- `public/samples/jsonrpc-catalog.json` — method catalog JSON matching `rpcMethods.ts`.
- `public/samples/events.cloudevents.json` — array of example events.
- `public/samples/postman-collection.json` — minimal Postman collection for REST quickstart.
- `src/content/samples/curl/*.sh`, `src/content/samples/rpc/*.json`, `src/content/samples/webhooks/*.json` — inline snippets rendered in pages and offered as "Copy" / "Download".

Each catalog page exposes a "Download spec" / "Copy sample" action.

## 4. Navigation & IA changes

- Add an **API** group to `AppSidebar.tsx`: Overview, REST resources, JSON-RPC methods, Events, Webhooks, AI tools, Errors, Compatibility.
- Add an **Architecture** group: ADRs, Boundaries, Security model, Idempotency, Versioning.
- Keep the 3 audience hubs (Developers / Businesses / Partners & Resellers); each hub gets a new "API direction" callout card linking to the relevant surface (Developers → REST + RPC; Businesses → Events + AI tools read-only; Partners → Compatibility + Webhooks + sub-merchant flows).
- Update `Index.tsx` hero to include the guiding-principle line and 5 surface tiles.

## 5. Guides to add to `articles.ts`

Task-flow guides (4–6 per audience), e.g.:

- Developers: "Choose REST vs JSON-RPC", "Idempotency keys for money movement", "Verify webhook signatures", "Handle the unified error envelope", "Use the compatibility layer for Authorize.net".
- Businesses: "Subscribe to events instead of polling", "What AI assistants can and can't do on your account", "Reading settlement events".
- Partners/Resellers: "Sub-merchant onboarding via REST + events", "Provider adapter overview", "Compatibility adapter mapping cheat sheet".

Each guide cross-links to the relevant catalog entry (REST resource, RPC method, event, AI tool, or ADR).

## 6. ADR pages

Author ADR-001 … ADR-010 (titles per spec) as structured entries: Status, Context, Decision, Consequences, Related ADRs. Render via `Adrs.tsx` index + `AdrDetail.tsx`.

## 7. Cross-cutting docs pages

- `SecurityModel.tsx` — `/architecture/security` — OAuth/OIDC, API keys, mTLS note, scope table from `scopes.ts`.
- `Idempotency.tsx` — `/architecture/idempotency` — REST `Idempotency-Key` header + RPC `idempotency_key` param + operation matrix.
- `Versioning.tsx` — `/architecture/versioning` — allowed non-breaking changes, deprecation policy.
- `Boundaries.tsx` — `/architecture/boundaries` — the layered diagram (External REST → Service → JSON-RPC → Adapters → Providers), what does/doesn't leak.

## 8. Out of scope (explicit non-goals)

- No real backend, no Lovable Cloud enablement.
- No live request execution from the docs — all samples are static/mocked.
- No SDK generation, no actual OpenAPI validation pipeline.
- Existing pages (Status, Changelog, Support, FAQ, Getting Started) are untouched except for sidebar grouping.

## 9. Technical details

- Strict typing: each catalog file exports a typed array consumed by its page; shared types in `src/content/types.ts`.
- Filtering UI reuses existing patterns (Accordion + search input from `ApiReference.tsx`, `PersonaTabs` where personas apply).
- Side-effect class rendered with `AptTag` variants: `read_only`→muted, `draft_only`→muted, `write_safe`→accent, `money_movement`→warning, `security_sensitive`→warning.
- Routes registered in `src/App.tsx` under the existing `Layout`.
- Spacing/tokens follow the APT standard already enforced (`spacing="compact"`, `space-y-6` main column, `gap-6` grids, no off-scale values, no hardcoded colors).
- Sample files in `public/samples/` are served statically; pages link to them with `<a download>`.

## 10. Suggested build order

1. Types + catalog data files (`apiSurfaces`, `restResources`, `rpcMethods`, `events`, `aiTools`, `errorCodes`, `scopes`, `idStandards`, `adrs`).
2. Sample assets under `public/samples/` and `src/content/samples/`.
3. New pages + routes + sidebar groups.
4. Hub cards + Index hero update + new prose guides.
5. ADR pages.
6. Final pass: cross-links between guides ↔ catalogs ↔ ADRs.

Approve and I'll implement in that order.
