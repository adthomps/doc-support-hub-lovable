import type { SideEffectClass } from "@/content/rpcMethods"
import { AptTag, type AptTagProps } from "@/components/apt/AptTag"

const map: Record<SideEffectClass, { label: string; variant: AptTagProps["variant"] }> = {
  read_only: { label: "read-only", variant: "muted" },
  draft_only: { label: "draft-only", variant: "muted" },
  write_safe: { label: "write-safe", variant: "accent" },
  money_movement: { label: "money-movement", variant: "warning" },
  security_sensitive: { label: "security-sensitive", variant: "warning" },
}

export function SideEffectTag({ value }: { value: SideEffectClass }) {
  const m = map[value]
  return <AptTag variant={m.variant} className="font-mono">{m.label}</AptTag>
}
