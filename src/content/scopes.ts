export type Scope = {
  name: string
  description: string
  category: "transactions" | "payments" | "customers" | "webhooks" | "settlements" | "risk" | "admin" | "ai"
}

export const scopes: Scope[] = [
  { name: "transactions:read", description: "Read transactions, events, disputes.", category: "transactions" },
  { name: "transactions:write", description: "Annotate transactions (notes, tags).", category: "transactions" },
  { name: "payments:authorize", description: "Create and confirm payment intents.", category: "payments" },
  { name: "payments:capture", description: "Capture authorized payments.", category: "payments" },
  { name: "refunds:create", description: "Create refunds.", category: "payments" },
  { name: "refunds:approve", description: "Approve refunds above the auto-approve threshold.", category: "payments" },
  { name: "customers:read", description: "Read customer profiles.", category: "customers" },
  { name: "customers:write", description: "Create or update customer profiles.", category: "customers" },
  { name: "payment_methods:write", description: "Tokenize and attach payment methods.", category: "customers" },
  { name: "webhooks:read", description: "Read webhook endpoints and delivery logs.", category: "webhooks" },
  { name: "webhooks:write", description: "Create, test, and replay webhook deliveries.", category: "webhooks" },
  { name: "webhooks:rotate_secret", description: "Rotate webhook signing secrets.", category: "webhooks" },
  { name: "settlements:read", description: "Read settlement batches and reconciliation.", category: "settlements" },
  { name: "disputes:read", description: "Read dispute details.", category: "settlements" },
  { name: "risk:read", description: "Read risk signals and decisions.", category: "risk" },
  { name: "risk:write", description: "Change risk rules and thresholds.", category: "risk" },
  { name: "api_keys:manage", description: "Create, rotate, and revoke API keys.", category: "admin" },
  { name: "ai_tools:use", description: "Use read-only and draft-only AI tools.", category: "ai" },
  { name: "ai_tools:approve_money_movement", description: "Approve AI-initiated money movement.", category: "ai" },
]
