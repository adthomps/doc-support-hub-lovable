import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Code, Users, Shield, ArrowRight, Check } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type Audience = "developer" | "merchant" | "reseller"

const audiences: { id: Audience; title: string; description: string; icon: React.ComponentType<{ className?: string }>; nextHref: string }[] = [
  { id: "developer", title: "Developer", description: "APIs, SDKs & integrations", icon: Code, nextHref: "/developers" },
  { id: "merchant", title: "Merchant", description: "Run your business", icon: Users, nextHref: "/businesses" },
  { id: "reseller", title: "Reseller", description: "Partner & resell", icon: Shield, nextHref: "/resellers" },
]

const stepsByAudience: Record<Audience, string[]> = {
  developer: [
    "Create your account and team workspace",
    "Generate an API key from the dashboard",
    "Install the SDK for your language",
    "Make your first authenticated request",
    "Set up a webhook endpoint",
  ],
  merchant: [
    "Verify your business and complete KYC",
    "Connect a bank account for payouts",
    "Configure accepted payment methods",
    "Send your first invoice or charge",
    "Review your first payout schedule",
  ],
  reseller: [
    "Sign the partner agreement",
    "Complete the reseller training module",
    "Download marketing & sales assets",
    "Add your first sub-account",
    "Invite a team member to the partner portal",
  ],
}

export default function GettingStarted() {
  const [audience, setAudience] = useState<Audience>("developer")
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const raw = localStorage.getItem("apt:onboarding")
    if (raw) {
      try {
        setCompleted(JSON.parse(raw))
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("apt:onboarding", JSON.stringify(completed))
  }, [completed])

  const steps = stepsByAudience[audience]
  const progress = useMemo(() => {
    const done = steps.filter((_, i) => completed[`${audience}:${i}`]).length
    return Math.round((done / steps.length) * 100)
  }, [audience, steps, completed])

  const toggle = (i: number) => {
    const key = `${audience}:${i}`
    setCompleted((p) => ({ ...p, [key]: !p[key] }))
  }

  const next = audiences.find((a) => a.id === audience)!

  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Resources"
      title="Getting started"
      description="A guided checklist tailored to your role. Progress is saved on this device."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle>Choose your role</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                {audiences.map((a) => {
                  const active = a.id === audience
                  return (
                    <button
                      key={a.id}
                      onClick={() => setAudience(a.id)}
                      className="text-left"
                    >
                      <AptCard
                        variant={active ? "feature" : "interactive"}
                        padding="dense"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <a.icon className="h-4 w-4 text-foreground" />
                          <span className="text-sm font-semibold text-foreground">{a.title}</span>
                          {active && <AptTag variant="accent" className="ml-auto">Selected</AptTag>}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{a.description}</p>
                      </AptCard>
                    </button>
                  )
                })}
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center justify-between">
                <span>Your checklist</span>
                <AptTag variant="muted">{progress}% complete</AptTag>
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-4">
              <Progress value={progress} className="h-2" />
              <ul className="space-y-2">
                {steps.map((step, i) => {
                  const key = `${audience}:${i}`
                  const done = !!completed[key]
                  return (
                    <li key={key}>
                      <AptCard variant="interactive" padding="dense" className="flex items-center gap-3">
                        <Checkbox checked={done} onCheckedChange={() => toggle(i)} id={key} />
                        <label
                          htmlFor={key}
                          className={`flex-1 text-sm cursor-pointer ${done ? "text-muted-foreground line-through" : "text-foreground"}`}
                        >
                          <span className="mr-2 text-xs text-muted-foreground">Step {i + 1}</span>
                          {step}
                        </label>
                        {done && <Check className="h-4 w-4 text-success" />}
                      </AptCard>
                    </li>
                  )
                })}
              </ul>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">What's next</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full justify-between" asChild>
                <Link to={next.nextHref}>
                  Explore {next.title} hub <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/api">API reference <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/support">Contact support <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base">Tip</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use ⌘K (or Ctrl+K) anywhere to jump between sections.
              </p>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
