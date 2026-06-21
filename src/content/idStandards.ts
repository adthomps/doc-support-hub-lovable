export type IdPrefix = {
  prefix: string
  resource: string
  notes?: string
}

export const idPrefixes: IdPrefix[] = [
  { prefix: "acct_", resource: "Account" },
  { prefix: "mer_", resource: "Merchant / sub-merchant" },
  { prefix: "cus_", resource: "Customer" },
  { prefix: "pm_", resource: "Payment method" },
  { prefix: "pi_", resource: "Payment intent" },
  { prefix: "txn_", resource: "Transaction" },
  { prefix: "ref_", resource: "Refund" },
  { prefix: "evt_", resource: "Event" },
  { prefix: "wh_", resource: "Webhook endpoint" },
  { prefix: "set_", resource: "Settlement" },
  { prefix: "disp_", resource: "Dispute" },
  { prefix: "req_", resource: "Request correlation ID" },
  { prefix: "key_", resource: "API key" },
  { prefix: "tok_", resource: "Single-use token" },
  { prefix: "idem_", resource: "Idempotency key", notes: "Client-generated; opaque to the server." },
]
