export type RestEndpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  scope?: string
  idempotent?: boolean
  request?: string
  response?: string
}

export type RestResource = {
  id: string
  name: string
  basePath: string
  idPrefix: string
  summary: string
  endpoints: RestEndpoint[]
}

export const restResources: RestResource[] = [
  {
    id: "payment-intents",
    name: "Payment Intents",
    basePath: "/v1/payment-intents",
    idPrefix: "pi_",
    summary: "Drives the full authorize → confirm → capture lifecycle for a payment.",
    endpoints: [
      { method: "POST", path: "/v1/payment-intents", description: "Create a payment intent.", scope: "payments:authorize", idempotent: true,
        request: `{ "amount": 1299, "currency": "USD", "customer": "cus_123", "capture_method": "manual" }`,
        response: `{ "id": "pi_123", "status": "requires_confirmation", "amount": 1299, "currency": "USD" }` },
      { method: "GET", path: "/v1/payment-intents/{id}", description: "Retrieve a payment intent.", scope: "transactions:read",
        response: `{ "id": "pi_123", "status": "requires_confirmation" }` },
      { method: "POST", path: "/v1/payment-intents/{id}/confirm", description: "Confirm a payment intent and trigger 3DS if needed.", scope: "payments:authorize", idempotent: true,
        response: `{ "id": "pi_123", "status": "requires_action", "next_action": { "type": "redirect_to_url" } }` },
      { method: "POST", path: "/v1/payment-intents/{id}/capture", description: "Capture an authorized intent (supports partial).", scope: "payments:capture", idempotent: true,
        request: `{ "amount": 1000 }`, response: `{ "id": "pi_123", "status": "succeeded", "amount_captured": 1000 }` },
      { method: "POST", path: "/v1/payment-intents/{id}/cancel", description: "Cancel an unconfirmed or uncaptured intent.", scope: "payments:authorize",
        response: `{ "id": "pi_123", "status": "canceled" }` },
    ],
  },
  {
    id: "transactions",
    name: "Transactions",
    basePath: "/v1/transactions",
    idPrefix: "txn_",
    summary: "Immutable record of money movement attempts and outcomes.",
    endpoints: [
      { method: "GET", path: "/v1/transactions", description: "Search transactions by date, status, customer, or intent.", scope: "transactions:read",
        response: `{ "data": [{ "id": "txn_123", "status": "authorized" }], "next": null }` },
      { method: "GET", path: "/v1/transactions/{id}", description: "Retrieve a single transaction.", scope: "transactions:read",
        response: `{ "id": "txn_123", "status": "authorized", "payment_intent": "pi_123" }` },
    ],
  },
  {
    id: "refunds",
    name: "Refunds",
    basePath: "/v1/refunds",
    idPrefix: "ref_",
    summary: "Full and partial refunds against a captured transaction.",
    endpoints: [
      { method: "POST", path: "/v1/refunds", description: "Create a refund.", scope: "refunds:create", idempotent: true,
        request: `{ "transaction": "txn_123", "amount": 500, "reason": "requested_by_customer" }`,
        response: `{ "id": "ref_123", "status": "succeeded", "amount": 500 }` },
      { method: "GET", path: "/v1/refunds/{id}", description: "Retrieve a refund.", scope: "refunds:create",
        response: `{ "id": "ref_123", "status": "succeeded" }` },
    ],
  },
  {
    id: "customers",
    name: "Customers",
    basePath: "/v1/customers",
    idPrefix: "cus_",
    summary: "Persistent payer profiles with stored payment methods.",
    endpoints: [
      { method: "POST", path: "/v1/customers", description: "Create a customer profile.", scope: "customers:write", idempotent: true,
        request: `{ "email": "a@b.co", "name": "Ada Lovelace" }`,
        response: `{ "id": "cus_123", "email": "a@b.co" }` },
      { method: "GET", path: "/v1/customers/{id}", description: "Retrieve a customer.", scope: "customers:read",
        response: `{ "id": "cus_123", "email": "a@b.co" }` },
    ],
  },
  {
    id: "payment-methods",
    name: "Payment Methods",
    basePath: "/v1/payment-methods",
    idPrefix: "pm_",
    summary: "Tokenized payment instruments attached to customers.",
    endpoints: [
      { method: "POST", path: "/v1/payment-methods", description: "Tokenize a payment method.", scope: "payment_methods:write", idempotent: true,
        request: `{ "type": "card", "card": { "token": "tok_abc" }, "customer": "cus_123" }`,
        response: `{ "id": "pm_123", "type": "card", "card": { "brand": "visa", "last4": "4242" } }` },
      { method: "DELETE", path: "/v1/payment-methods/{id}", description: "Detach a payment method.", scope: "payment_methods:write",
        response: `{ "deleted": true }` },
    ],
  },
  {
    id: "checkout-sessions",
    name: "Checkout Sessions",
    basePath: "/v1/checkout/sessions",
    idPrefix: "cs_",
    summary: "Hosted checkout sessions for low-code merchant integrations.",
    endpoints: [
      { method: "POST", path: "/v1/checkout/sessions", description: "Create a checkout session and get a hosted URL.", scope: "payments:authorize", idempotent: true,
        request: `{ "line_items": [{ "name": "Pro plan", "amount": 4900, "quantity": 1 }], "success_url": "https://...", "cancel_url": "https://..." }`,
        response: `{ "id": "cs_123", "url": "https://checkout.example.com/cs_123" }` },
    ],
  },
  {
    id: "webhooks-endpoints",
    name: "Webhook Endpoints",
    basePath: "/v1/webhooks/endpoints",
    idPrefix: "wh_",
    summary: "Register URLs to receive event deliveries with rotating signing secrets.",
    endpoints: [
      { method: "POST", path: "/v1/webhooks/endpoints", description: "Register a webhook endpoint.", scope: "webhooks:write",
        request: `{ "url": "https://example.com/hook", "events": ["payment.authorized", "refund.succeeded"] }`,
        response: `{ "id": "wh_123", "secret": "whsec_..." }` },
      { method: "POST", path: "/v1/webhooks/endpoints/{id}/test", description: "Send a test event to the endpoint.", scope: "webhooks:write",
        response: `{ "delivered": true, "status_code": 200 }` },
      { method: "POST", path: "/v1/webhooks/endpoints/{id}/rotate-secret", description: "Rotate the signing secret.", scope: "webhooks:rotate_secret",
        response: `{ "id": "wh_123", "secret": "whsec_new_..." }` },
    ],
  },
  {
    id: "events",
    name: "Events",
    basePath: "/v1/events",
    idPrefix: "evt_",
    summary: "Append-only event log. The source of truth for lifecycle changes.",
    endpoints: [
      { method: "GET", path: "/v1/events/{id}", description: "Retrieve a specific event.", scope: "transactions:read",
        response: `{ "id": "evt_123", "type": "payment.authorized", "data": { "transaction_id": "txn_123" } }` },
      { method: "POST", path: "/v1/events/{id}/replay", description: "Replay a delivered event to subscribers.", scope: "webhooks:write",
        response: `{ "event": "evt_123", "delivered": true }` },
    ],
  },
  {
    id: "disputes",
    name: "Disputes",
    basePath: "/v1/disputes",
    idPrefix: "disp_",
    summary: "Chargebacks and inquiries with evidence submission.",
    endpoints: [
      { method: "GET", path: "/v1/disputes", description: "List open and resolved disputes.", scope: "transactions:read",
        response: `{ "data": [{ "id": "disp_123", "status": "needs_response" }] }` },
      { method: "POST", path: "/v1/disputes/{id}/evidence", description: "Submit dispute evidence.", scope: "transactions:read",
        request: `{ "receipt_url": "...", "shipping_proof": "..." }`,
        response: `{ "id": "disp_123", "status": "under_review" }` },
    ],
  },
  {
    id: "settlements",
    name: "Settlements",
    basePath: "/v1/settlements",
    idPrefix: "set_",
    summary: "Daily settlement batches and reconciliation references.",
    endpoints: [
      { method: "GET", path: "/v1/settlements", description: "List settlements.", scope: "settlements:read",
        response: `{ "data": [{ "id": "set_123", "amount": 482300, "currency": "USD" }] }` },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    basePath: "/v1/reports",
    idPrefix: "rep_",
    summary: "Asynchronous report generation (transactions, settlements, residuals).",
    endpoints: [
      { method: "POST", path: "/v1/reports", description: "Request a report.", scope: "transactions:read",
        request: `{ "type": "transactions", "from": "2026-06-01", "to": "2026-06-21" }`,
        response: `{ "id": "rep_123", "status": "pending" }` },
    ],
  },
  {
    id: "api-keys",
    name: "API Keys",
    basePath: "/v1/api-keys",
    idPrefix: "key_",
    summary: "Manage scoped server-to-server credentials.",
    endpoints: [
      { method: "POST", path: "/v1/api-keys", description: "Create a scoped API key.", scope: "api_keys:manage",
        request: `{ "name": "Backend prod", "scopes": ["transactions:read", "refunds:create"] }`,
        response: `{ "id": "key_123", "secret": "sk_live_..." }` },
    ],
  },
  {
    id: "accounts",
    name: "Accounts",
    basePath: "/v1/accounts",
    idPrefix: "acct_",
    summary: "Top-level platform accounts.",
    endpoints: [
      { method: "GET", path: "/v1/accounts/{id}", description: "Retrieve an account.", scope: "transactions:read",
        response: `{ "id": "acct_123", "name": "Acme Platform" }` },
    ],
  },
  {
    id: "merchants",
    name: "Merchants",
    basePath: "/v1/merchants",
    idPrefix: "mer_",
    summary: "Sub-merchants under a partner or platform account.",
    endpoints: [
      { method: "POST", path: "/v1/merchants", description: "Board a sub-merchant.", scope: "api_keys:manage", idempotent: true,
        request: `{ "business_name": "Acme Coffee", "country": "US", "mcc": "5812" }`,
        response: `{ "id": "mer_123", "status": "pending_kyc" }` },
    ],
  },
]
