import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * AptCard — canonical card with 6 variants per APT spec.
 * default | interactive | elevated | hero | subtle | feature
 *
 * Guard rails:
 *  - `hero` should appear at most once per view.
 *  - `feature` should not be used as the baseline for repeated cards.
 */
const cardVariants = cva(
  "rounded-lg border text-card-foreground transition-colors duration-default ease-smooth",
  {
    variants: {
      variant: {
        default: "bg-card border-border shadow-elevation-1",
        interactive:
          "bg-card border-border shadow-elevation-1 hover:bg-secondary/40 hover:border-border cursor-pointer",
        elevated: "bg-card border-border shadow-elevation-3",
        hero: "bg-surface border-border shadow-elevation-2",
        subtle: "bg-muted/40 border-border/60 shadow-elevation-0",
        feature: "bg-card border-accent/40 shadow-elevation-2",
      },
      padding: {
        dense: "p-4",
        default: "p-6",
        feature: "p-8",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  }
)

export interface AptCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const AptCard = React.forwardRef<HTMLDivElement, AptCardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding }), className)} {...props} />
  )
)
AptCard.displayName = "AptCard"

const AptCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-6 pb-4", className)} {...props} />
  )
)
AptCardHeader.displayName = "AptCardHeader"

const AptCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-tight tracking-tight text-foreground", className)} {...props} />
  )
)
AptCardTitle.displayName = "AptCardTitle"

const AptCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground leading-relaxed", className)} {...props} />
  )
)
AptCardDescription.displayName = "AptCardDescription"

const AptCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
AptCardContent.displayName = "AptCardContent"

const AptCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
)
AptCardFooter.displayName = "AptCardFooter"

export { AptCard, AptCardHeader, AptCardTitle, AptCardDescription, AptCardContent, AptCardFooter }
