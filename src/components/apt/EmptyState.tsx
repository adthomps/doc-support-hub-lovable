import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AptCard } from "./AptCard"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

/** APT empty-state pattern: optional icon, heading, one-sentence context, optional CTA. */
export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <AptCard variant="subtle" className={cn("flex flex-col items-center justify-center text-center px-8 py-14", className)}>
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </AptCard>
  )
}
