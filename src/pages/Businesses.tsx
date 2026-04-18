import { BookOpen, Video, HelpCircle, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"

const popularGuides = [
  { title: "Getting started guide", views: "12.5k", rating: 4.9, time: "5 min read" },
  { title: "Account settings", views: "8.2k", rating: 4.8, time: "3 min read" },
  { title: "Billing & payments", views: "6.1k", rating: 4.7, time: "4 min read" },
  { title: "Privacy settings", views: "4.3k", rating: 4.6, time: "2 min read" },
]

const videoTutorials = [
  { title: "Platform overview", duration: "12:34" },
  { title: "Advanced features", duration: "18:45" },
  { title: "Mobile app guide", duration: "8:22" },
]

const categories = [
  { title: "Getting started", description: "Setup and initial configuration", count: 15 },
  { title: "Account management", description: "Profile, settings, and preferences", count: 23 },
  { title: "Billing & payments", description: "Subscriptions, invoices, payments", count: 12 },
  { title: "Troubleshooting", description: "Common issues and solutions", count: 18 },
]

export default function Customers() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Customers"
      title="Help center"
      description="User guides, tutorials, and support articles."
      actions={<AptTag>User</AptTag>}
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
                <p className="text-sm font-medium text-foreground">How do I reset my password?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Click "Forgot password" on the login page…</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">How do I cancel my subscription?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Go to Account settings &gt; Billing…</p>
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
                Mobile app (iOS) <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Mobile app (Android) <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Desktop app <span className="text-xs text-muted-foreground">v1.5.2</span>
              </Button>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
