import type { SideEffectClass } from "./rpcMethods"

export type AiTool = {
  name: string
  description: string
  scope: string
  sideEffect: SideEffectClass
  approvalRequired: boolean
  dryRun: boolean
  audience: "merchant" | "support" | "risk"
}

export const aiTools: AiTool[] = [
  { name: "merchant.search_transactions", description: "Search transactions by filters and summarize results.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "merchant" },
  { name: "merchant.explain_transaction", description: "Explain a transaction timeline in plain language.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "merchant" },
  { name: "merchant.explain_decline", description: "Explain a decline category and suggested next steps.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "merchant" },
  { name: "merchant.validate_webhook_config", description: "Validate webhook endpoint configuration without changing it.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "merchant" },
  { name: "merchant.generate_integration_plan", description: "Generate a phased integration plan from stated goals.", scope: "ai_tools:use", sideEffect: "draft_only", approvalRequired: false, dryRun: true, audience: "merchant" },
  { name: "merchant.create_refund_draft", description: "Draft a refund without submitting it.", scope: "ai_tools:use", sideEffect: "draft_only", approvalRequired: false, dryRun: true, audience: "merchant" },
  { name: "merchant.submit_refund", description: "Submit a previously drafted refund.", scope: "ai_tools:approve_money_movement", sideEffect: "money_movement", approvalRequired: true, dryRun: false, audience: "merchant" },
  { name: "merchant.capture_payment", description: "Capture an authorized payment.", scope: "ai_tools:approve_money_movement", sideEffect: "money_movement", approvalRequired: true, dryRun: false, audience: "merchant" },
  { name: "merchant.rotate_webhook_secret", description: "Rotate the signing secret for a webhook endpoint.", scope: "ai_tools:use", sideEffect: "security_sensitive", approvalRequired: true, dryRun: false, audience: "merchant" },
  { name: "support.summarize_customer_history", description: "Summarize a customer's recent activity.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "support" },
  { name: "support.explain_payment_timeline", description: "Walk through a payment's lifecycle for a support ticket.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "support" },
  { name: "support.identify_likely_integration_issue", description: "Inspect recent errors and suggest likely integration issues.", scope: "ai_tools:use", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "support" },
  { name: "support.generate_merchant_response_draft", description: "Draft a response to a merchant question.", scope: "ai_tools:use", sideEffect: "draft_only", approvalRequired: false, dryRun: true, audience: "support" },
  { name: "risk.review_transaction", description: "Surface risk signals for a transaction.", scope: "risk:read", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "risk" },
  { name: "risk.explain_risk_signal", description: "Explain a risk signal in plain language.", scope: "risk:read", sideEffect: "read_only", approvalRequired: false, dryRun: true, audience: "risk" },
]
