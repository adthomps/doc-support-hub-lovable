import { BookOpen, Video, HelpCircle, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"

const popularGuides = [
  { title: "Onboarding your business", views: "9.8k", rating: 4.9, time: "6 min read" },
  { title: "Accepting payments", views: "7.4k", rating: 4.8, time: "5 min read" },
  { title: "Managing payouts", views: "5.2k", rating: 4.7, time: "4 min read" },
  { title: "Handling disputes & chargebacks", views: "3.9k", rating: 4.6, time: "7 min read" },
]

const videoTutorials = [
  { title: "Merchant dashboard tour", duration: "10:12" },
  { title: "Setting up payouts", duration: "7:45" },
  { title: "Resolving a dispute", duration: "9:08" },
]

const categories = [
  { title: "Onboarding & KYC", description: "Verification, business profile, compliance", count: 14 },
  { title: "Payments & payouts", description: "Acceptance, settlement, schedules", count: 21 },
  { title: "Billing & invoicing", description: "Invoices, subscriptions, taxes", count: 16 },
  { title: "Disputes & risk", description: "Chargebacks, fraud signals, appeals", count: 11 },
]

export default function Businesses() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Businesses"
      title="Business & merchant hub"
      description="Operational guides for merchants and business users — onboarding, payments, billing, and dispute handling."
      actions={<AptTag>Merchant</AptTag>}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" /> Popular guides
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              {popularGuides.map((g) => (
                <AptCard key={g.title} variant="interactive" padding="dense" className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{g.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{g.views} views</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" /> {g.rating}
                      </span>
                      <span>{g.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </AptCard>
              ))}
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <Video className="h-4 w-4 text-muted-foreground" /> Video tutorials
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                {videoTutorials.map((v) => (
                  <AptCard key={v.title} variant="interactive" padding="dense">
                    <div className="aspect-video rounded-md bg-secondary border border-border mb-3 flex items-center justify-center">
                      <Video className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground">{v.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.duration}</p>
                  </AptCard>
                ))}
              </div>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle>Browse by category</AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {categories.map((c) => (
                  <AptCard key={c.title} variant="interactive" padding="dense">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{c.description}</p>
                    <AptTag variant="muted">{c.count} articles</AptTag>
                  </AptCard>
                ))}
              </div>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Need more help?</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full">Contact support</Button>
              <Button variant="outline" className="w-full">Live chat</Button>
              <Button variant="outline" className="w-full">Community forum</Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4" /> Quick FAQ
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">When do payouts arrive?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Standard payouts settle in 2 business days…</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">How do I respond to a dispute?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Open the dispute, attach evidence, submit…</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full">View all FAQs</Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base">Downloads</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                Merchant app (iOS) <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Merchant app (Android) <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Desktop dashboard <span className="text-xs text-muted-foreground">v1.5.2</span>
              </Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
