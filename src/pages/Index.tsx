import { Link } from "react-router-dom"
import { ArrowRight, Code, Users, Shield, BookOpen, FileText, MessageCircle, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { releases, kindVariant } from "@/content/changelog"

const audiences = [
  {
    title: "Developers",
    description: "APIs, SDKs, and integration guides for building on the platform.",
    icon: Code,
    href: "/developers",
    features: ["REST API reference", "SDKs & libraries", "Code examples", "Webhooks"],
    eyebrow: "Technical",
  },
  {
    title: "Businesses",
    description: "Operational guides for merchants — onboarding, payments, payouts, and disputes.",
    icon: Users,
    href: "/businesses",
    features: ["Onboarding & KYC", "Payments & payouts", "Billing & invoicing", "Disputes & risk"],
    eyebrow: "Merchant",
  },
  {
    title: "Resellers",
    description: "Partner resources, training materials, and business tools.",
    icon: Shield,
    href: "/resellers",
    features: ["Partner portal", "Training", "Marketing assets", "Support tools"],
    eyebrow: "Partner",
  },
]

const quickLinks = [
  { title: "Getting started", href: "/getting-started", icon: BookOpen },
  { title: "API reference", href: "/api", icon: FileText },
  { title: "FAQ", href: "/faq", icon: MessageCircle },
  { title: "Status", href: "/status", icon: Zap },
]

export default function Index() {
  const latest = releases.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <AptSection spacing="default" tone="subtle" width="wide" className="border-b border-border">
        <AptCard variant="hero" padding="feature" className="overflow-hidden">
          <div className="flex flex-col gap-6 max-w-3xl">
            <AptTag variant="accent" className="self-start">Documentation</AptTag>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Everything you need to build, integrate, and succeed.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A single source of truth for developers, merchants, and partners. Find guides,
              references, and support tailored to your role.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="accent" size="lg" asChild>
                <Link to="/getting-started">
                  Get started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/developers">Browse documentation</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Tip: press <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd> anywhere to search.
            </p>
          </div>
        </AptCard>
      </AptSection>

      {/* Audience selection */}
      <AptSection
        spacing="default"
        eyebrow="Choose your path"
        title="Documentation for every role"
        description="Select your role to access tailored documentation and resources."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((card) => (
            <AptCard key={card.title} variant="interactive" padding="default">
              <Link to={card.href} className="block h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary text-foreground">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <AptTag variant="muted">{card.eyebrow}</AptTag>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1.5">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{card.description}</p>
                <ul className="space-y-2 mb-6">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Explore {card.title} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </AptCard>
          ))}
        </div>
      </AptSection>

      {/* Quick access */}
      <AptSection
        spacing="compact"
        tone="subtle"
        eyebrow="Quick access"
        title="Jump to common resources"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <AptCard key={link.title} variant="interactive" padding="default">
              <Link to={link.href} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground">
                  <link.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{link.title}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </AptCard>
          ))}
        </div>
      </AptSection>

      {/* What's new */}
      <AptSection
        spacing="compact"
        eyebrow="What's new"
        title="Latest platform updates"
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/changelog">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        }
      >
        <div className="grid md:grid-cols-3 gap-4">
          {latest.map((r) => (
            <AptCard key={r.version} variant="default" padding="default">
              <div className="flex items-center gap-2 mb-3">
                <AptTag variant={kindVariant[r.kind]}>{r.kind}</AptTag>
                <span className="text-xs font-mono text-muted-foreground">{r.version}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </AptCard>
          ))}
        </div>
      </AptSection>
    </div>
  )
}
