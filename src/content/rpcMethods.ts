export type SideEffectClass =
  | "read_only"
  | "draft_only"
  | "write_safe"
  | "money_movement"
  | "security_sensitive"

export type RpcMethod = {
  name: string
  owner: string
  domain: string
  purpose: string
  scope: string
  sideEffect: SideEffectClass
  idempotent: boolean
  approvalRequired: boolean
  example: {
    request: string
    response: string
  }
}

export const rpcMethods: RpcMethod[] = [
  // payment.*
  {
    name: "payment.authorize",
    owner: "payments",
    domain: "payment",
    purpose: "Authorize a charge without capturing funds.",
    scope: "payments:authorize",
    sideEffect: "money_movement",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_1", "method": "payment.authorize",
  "params": { "merchant_id": "mer_123", "amount": 1299, "currency": "USD",
    "payment_method_token": "tok_abc", "capture": false, "idempotency_key": "idem_1" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_1",
  "result": { "transaction_id": "txn_123", "status": "authorized", "amount": 1299, "currency": "USD" } }`,
    },
  },
  {
    name: "payment.capture",
    owner: "payments",
    domain: "payment",
    purpose: "Capture a previously authorized transaction.",
    scope: "payments:capture",
    sideEffect: "money_movement",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_2", "method": "payment.capture",
  "params": { "transaction_id": "txn_123", "amount": 1299, "idempotency_key": "idem_2" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_2",
  "result": { "transaction_id": "txn_123", "status": "captured", "amount_captured": 1299 } }`,
    },
  },
  {
    name: "payment.void",
    owner: "payments",
    domain: "payment",
    purpose: "Void an uncaptured authorization.",
    scope: "payments:authorize",
    sideEffect: "money_movement",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_3", "method": "payment.void",
  "params": { "transaction_id": "txn_123", "idempotency_key": "idem_3" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_3", "result": { "transaction_id": "txn_123", "status": "voided" } }`,
    },
  },
  {
    name: "payment.refund",
    owner: "payments",
    domain: "payment",
    purpose: "Refund a captured transaction in full or part.",
    scope: "refunds:create",
    sideEffect: "money_movement",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_4", "method": "payment.refund",
  "params": { "transaction_id": "txn_123", "amount": 500, "idempotency_key": "idem_4" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_4", "result": { "refund_id": "ref_123", "status": "succeeded" } }`,
    },
  },
  // transaction.*
  {
    name: "transaction.get",
    owner: "transactions",
    domain: "transaction",
    purpose: "Retrieve a single transaction by ID.",
    scope: "transactions:read",
    sideEffect: "read_only",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_5", "method": "transaction.get", "params": { "transaction_id": "txn_123" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_5", "result": { "id": "txn_123", "status": "captured" } }`,
    },
  },
  {
    name: "transaction.search",
    owner: "transactions",
    domain: "transaction",
    purpose: "Search transactions by filters.",
    scope: "transactions:read",
    sideEffect: "read_only",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_6", "method": "transaction.search",
  "params": { "merchant_id": "mer_123", "status": "captured", "limit": 50 } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_6", "result": { "data": [{ "id": "txn_123" }], "next": null } }`,
    },
  },
  {
    name: "transaction.explainDecline",
    owner: "transactions",
    domain: "transaction",
    purpose: "Return a human-readable explanation of a decline.",
    scope: "transactions:read",
    sideEffect: "read_only",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_7", "method": "transaction.explainDecline", "params": { "transaction_id": "txn_998" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_7", "result": { "category": "issuer_decline", "reason": "insufficient_funds", "retryable": false } }`,
    },
  },
  // customer.* / token.*
  {
    name: "customer.create",
    owner: "customers",
    domain: "customer",
    purpose: "Create a customer profile.",
    scope: "customers:write",
    sideEffect: "write_safe",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_8", "method": "customer.create",
  "params": { "email": "a@b.co", "idempotency_key": "idem_8" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_8", "result": { "customer_id": "cus_123" } }`,
    },
  },
  {
    name: "token.create",
    owner: "payments",
    domain: "token",
    purpose: "Create a single-use or multi-use payment method token.",
    scope: "payment_methods:write",
    sideEffect: "write_safe",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_9", "method": "token.create",
  "params": { "type": "card", "card": { "number": "4242...", "exp_month": 12, "exp_year": 2030, "cvc": "123" } } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_9", "result": { "token": "tok_abc" } }`,
    },
  },
  // risk.*
  {
    name: "risk.evaluate",
    owner: "risk",
    domain: "risk",
    purpose: "Score a transaction without authorizing it.",
    scope: "risk:read",
    sideEffect: "read_only",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_10", "method": "risk.evaluate",
  "params": { "amount": 1299, "currency": "USD", "ip": "203.0.113.5" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_10", "result": { "score": 18, "action": "approve" } }`,
    },
  },
  // webhook.*
  {
    name: "webhook.testDelivery",
    owner: "webhooks",
    domain: "webhook",
    purpose: "Send a synthetic event to an endpoint for testing.",
    scope: "webhooks:write",
    sideEffect: "write_safe",
    idempotent: false,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_11", "method": "webhook.testDelivery",
  "params": { "endpoint_id": "wh_123", "type": "payment.authorized" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_11", "result": { "delivered": true, "status_code": 200 } }`,
    },
  },
  {
    name: "webhook.replayEvent",
    owner: "webhooks",
    domain: "webhook",
    purpose: "Replay a previously delivered event.",
    scope: "webhooks:write",
    sideEffect: "write_safe",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_12", "method": "webhook.replayEvent", "params": { "event_id": "evt_123" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_12", "result": { "delivered": true } }`,
    },
  },
  // settlement.*
  {
    name: "settlement.reconcile",
    owner: "finance",
    domain: "settlement",
    purpose: "Run reconciliation against a settlement batch.",
    scope: "settlements:read",
    sideEffect: "read_only",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_13", "method": "settlement.reconcile", "params": { "settlement_id": "set_123" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_13", "result": { "matched": 482, "unmatched": 0 } }`,
    },
  },
  // provider.*
  {
    name: "provider.cybersource.authorize",
    owner: "adapters",
    domain: "provider.cybersource",
    purpose: "Authorize via the Cybersource adapter. Internal only — public callers use payment.authorize.",
    scope: "payments:authorize",
    sideEffect: "money_movement",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "jsonrpc": "2.0", "id": "req_14", "method": "provider.cybersource.authorize",
  "params": { "merchant_reference": "mer_123", "amount": "12.99", "currency": "USD" } }`,
      response: `{ "jsonrpc": "2.0", "id": "req_14", "result": { "provider_reference_id": "cs_ref_abc", "decision": "ACCEPT" } }`,
    },
  },
  // compat.*
  {
    name: "compat.authorizenet.createTransactionRequest",
    owner: "compat",
    domain: "compat.authorizenet",
    purpose: "Accept an Authorize.net-shaped request and translate to payment.authorize / payment.capture.",
    scope: "payments:authorize",
    sideEffect: "money_movement",
    idempotent: true,
    approvalRequired: false,
    example: {
      request: `{ "createTransactionRequest": { "merchantAuthentication": { "name": "...", "transactionKey": "..." },
    "transactionRequest": { "transactionType": "authCaptureTransaction", "amount": "12.99",
      "payment": { "creditCard": { "cardNumber": "4242...", "expirationDate": "1230" } } } } }`,
      response: `{ "transactionResponse": { "responseCode": "1", "transId": "1234567890", "messages": [{ "code": "1", "description": "Approved" }] } }`,
    },
  },
]
