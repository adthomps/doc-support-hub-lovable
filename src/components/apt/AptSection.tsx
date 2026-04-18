import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * AptSection — structural primitive enforcing rhythm and width.
 */
const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      default: "py-16 md:py-20",
      compact: "py-10 md:py-12",
      none: "py-0",
    },
    tone: {
      default: "bg-background",
      subtle: "bg-surface",
      elevated: "bg-card",
    },
  },
  defaultVariants: {
    spacing: "default",
    tone: "default",
  },
})

const widthClasses = {
  prose: "max-w-prose",
  content: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const

export interface AptSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  width?: keyof typeof widthClasses
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

export const AptSection = React.forwardRef<HTMLElement, AptSectionProps>(
  ({ className, spacing, tone, width = "wide", eyebrow, title, description, actions, children, ...props }, ref) => {
    const hasIntro = eyebrow || title || description || actions
    return (
      <section ref={ref} className={cn(sectionVariants({ spacing, tone }), className)} {...props}>
        <div className={cn("mx-auto px-6", widthClasses[width])}>
          {hasIntro && (
            <header className="mb-10 flex flex-col gap-3">
              {eyebrow && (
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
              {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
            </header>
          )}
          {children}
        </div>
      </section>
    )
  }
)
AptSection.displayName = "AptSection"
