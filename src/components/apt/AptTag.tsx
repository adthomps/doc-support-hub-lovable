import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-secondary-foreground",
        accent: "border-accent/40 bg-accent/10 text-accent",
        success: "border-border bg-muted text-success",
        warning: "border-border bg-muted text-warning",
        muted: "border-border/60 bg-transparent text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface AptTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export const AptTag = React.forwardRef<HTMLSpanElement, AptTagProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(tagVariants({ variant }), className)} {...props} />
  )
)
AptTag.displayName = "AptTag"
