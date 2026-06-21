export type EventDef = {
  type: string
  description: string
  subjectIdPrefix: string
  samplePayload: string
}

export const events: EventDef[] = [
  {
    type: "payment.created",
    description: "A payment intent has been created.",
    subjectIdPrefix: "pi_",
    samplePayload: `{ "payment_intent_id": "pi_123", "amount": 1299, "currency": "USD", "status": "requires_confirmation" }`,
  },
  {
    type: "payment.authorized",
    description: "Funds have been authorized but not captured.",
    subjectIdPrefix: "txn_",
    samplePayload: `{ "transaction_id": "txn_123", "payment_intent_id": "pi_123", "amount": 1299, "currency": "USD", "status": "authorized" }`,
  },
  {
    type: "payment.captured",
    description: "Funds have been captured.",
    subjectIdPrefix: "txn_",
    samplePayload: `{ "transaction_id": "txn_123", "amount_captured": 1299, "currency": "USD" }`,
  },
  {
    type: "payment.declined",
    description: "A payment was declined by the issuer or risk.",
    subjectIdPrefix: "txn_",
    samplePayload: `{ "transaction_id": "txn_124", "decline_code": "insufficient_funds", "retryable": false }`,
  },
  {
    type: "payment.voided",
    description: "A previously authorized payment was voided.",
    subjectIdPrefix: "txn_",
    samplePayload: `{ "transaction_id": "txn_123", "status": "voided" }`,
  },
  {
    type: "refund.created",
    description: "A refund was requested.",
    subjectIdPrefix: "ref_",
    samplePayload: `{ "refund_id": "ref_123", "transaction_id": "txn_123", "amount": 500 }`,
  },
  {
    type: "refund.succeeded",
    description: "A refund has settled to the customer.",
    subjectIdPrefix: "ref_",
    samplePayload: `{ "refund_id": "ref_123", "status": "succeeded" }`,
  },
  {
    type: "refund.failed",
    description: "A refund could not be processed.",
    subjectIdPrefix: "ref_",
    samplePayload: `{ "refund_id": "ref_123", "status": "failed", "reason": "issuer_unavailable" }`,
  },
  {
    type: "customer.created",
    description: "A customer profile was created.",
    subjectIdPrefix: "cus_",
    samplePayload: `{ "customer_id": "cus_123", "email": "a@b.co" }`,
  },
  {
    type: "payment_method.created",
    description: "A payment method was tokenized and attached.",
    subjectIdPrefix: "pm_",
    samplePayload: `{ "payment_method_id": "pm_123", "customer_id": "cus_123", "type": "card" }`,
  },
  {
    type: "risk.review_required",
    description: "A transaction needs manual review.",
    subjectIdPrefix: "txn_",
    samplePayload: `{ "transaction_id": "txn_125", "score": 84, "signals": ["high_velocity", "mismatched_avs"] }`,
  },
  {
    type: "settlement.funded",
    description: "A settlement batch has been funded.",
    subjectIdPrefix: "set_",
    samplePayload: `{ "settlement_id": "set_123", "amount": 482300, "currency": "USD" }`,
  },
  {
    type: "dispute.opened",
    description: "A chargeback or inquiry was opened.",
    subjectIdPrefix: "disp_",
    samplePayload: `{ "dispute_id": "disp_123", "transaction_id": "txn_123", "reason": "fraudulent" }`,
  },
  {
    type: "webhook.delivery_failed",
    description: "A webhook delivery attempt failed and will be retried.",
    subjectIdPrefix: "wh_",
    samplePayload: `{ "endpoint_id": "wh_123", "event_id": "evt_456", "status_code": 500, "attempt": 2 }`,
  },
]

export const eventEnvelopeExample = `{
  "id": "evt_123",
  "type": "payment.authorized",
  "source": "apt.gateway",
  "specversion": "1.0",
  "time": "2026-06-21T14:12:00Z",
  "subject": "txn_123",
  "data": {
    "transaction_id": "txn_123",
    "payment_intent_id": "pi_123",
    "amount": 1299,
    "currency": "USD",
    "status": "authorized"
  }
}`
