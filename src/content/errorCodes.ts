export const errorEnvelopeExample = `{
  "error": {
    "code": "payment_method_declined",
    "message": "The payment method was declined.",
    "type": "payment_error",
    "request_id": "req_123",
    "details": {
      "transaction_id": "txn_123",
      "decline_code": "insufficient_funds"
    }
  }
}`

export type RestErrorCode = {
  code: string
  type: string
  meaning: string
  remediation: string
}

export const restErrorCodes: RestErrorCode[] = [
  { code: "invalid_request", type: "validation_error", meaning: "Payload failed schema validation.", remediation: "Inspect the `field_errors` array in the response body." },
  { code: "missing_idempotency_key", type: "validation_error", meaning: "A money-moving call was missing Idempotency-Key.", remediation: "Generate a UUID per logical request and send it in the header." },
  { code: "idempotency_key_conflict", type: "conflict_error", meaning: "The same key was reused with a different payload.", remediation: "Use a fresh idempotency key per logical request." },
  { code: "authentication_required", type: "auth_error", meaning: "Missing or invalid bearer token.", remediation: "Rotate the key and confirm the Authorization header." },
  { code: "permission_denied", type: "auth_error", meaning: "Authenticated but the scope or role is insufficient.", remediation: "Grant the missing scope on the API key." },
  { code: "resource_not_found", type: "not_found_error", meaning: "The resource does not exist in this workspace.", remediation: "Verify the ID and the merchant context." },
  { code: "payment_method_declined", type: "payment_error", meaning: "The issuer or risk engine declined the payment.", remediation: "Show the customer a retry path; do not retry automatically." },
  { code: "rate_limited", type: "rate_limit_error", meaning: "You exceeded the request budget.", remediation: "Back off using the `Retry-After` header with jitter." },
  { code: "internal_error", type: "api_error", meaning: "An unexpected server error.", remediation: "Retry idempotently with backoff; contact support if persistent." },
]

export type RpcErrorCode = {
  code: number
  name: string
  meaning: string
}

export const rpcErrorCodes: RpcErrorCode[] = [
  { code: -32600, name: "invalid_request", meaning: "The JSON sent is not a valid request object." },
  { code: -32601, name: "method_not_found", meaning: "The method does not exist or is not exposed." },
  { code: -32602, name: "invalid_params", meaning: "Method parameters failed validation." },
  { code: -32603, name: "internal_error", meaning: "Internal JSON-RPC error." },
  { code: -32001, name: "payment_method_declined", meaning: "Issuer or risk decline. Mirror of REST `payment_method_declined`." },
  { code: -32002, name: "permission_denied", meaning: "Method requires a scope the caller does not hold." },
  { code: -32003, name: "approval_required", meaning: "Caller must obtain human approval before execution." },
  { code: -32004, name: "idempotency_conflict", meaning: "Same idempotency_key reused with a different payload." },
]
