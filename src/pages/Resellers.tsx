import { TrendingUp, FileText, Award, Target, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AptSection } from "@/components/apt/AptSection"
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent } from "@/components/apt/AptCard"
import { AptTag } from "@/components/apt/AptTag"

const partnerStats = [
  { label: "Active partners", value: "2,847", change: "+12%" },
  { label: "Total revenue", value: "$1.2M", change: "+24%" },
  { label: "Commission rate", value: "15%", change: "Avg" },
]

const trainingModules = [
  { title: "Product overview", status: "completed", progress: 100 },
  { title: "Sales techniques", status: "in-progress", progress: 65 },
  { title: "Technical deep dive", status: "available", progress: 0 },
  { title: "Customer success", status: "available", progress: 0 },
]

const marketingAssets = [
  { name: "Brand guidelines", type: "PDF", size: "2.4 MB" },
  { name: "Logo pack", type: "ZIP", size: "15.8 MB" },
  { name: "Product brochure", type: "PDF", size: "3.1 MB" },
  { name: "Case studies", type: "PDF", size: "5.2 MB" },
]

const salesTools = [
  { title: "Pricing calculator", description: "Generate custom quotes for prospects", cta: "Open tool" },
  { title: "ROI templates", description: "Show value to potential customers", cta: "Download" },
  { title: "Lead tracker", description: "Manage your sales pipeline", cta: "Access" },
  { title: "Performance dashboard", description: "Track your sales metrics", cta: "View" },
]

export default function Resellers() {
  return (
    <AptSection
      spacing="compact"
      width="wide"
      eyebrow="Resellers"
      title="Partner portal"
      description="Resources, training, and tools for resellers."
      actions={<AptTag>Partner</AptTag>}
    >
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {partnerStats.map((s) => (
          <AptCard key={s.label} variant="default" padding="default">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-semibold text-foreground">{s.value}</p>
              <AptTag variant={s.change.includes("+") ? "success" : "muted"}>{s.change}</AptTag>
            </div>
          </AptCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" /> Training & certification
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Complete training modules to become a certified partner and unlock higher commission rates.
              </p>
              {trainingModules.map((m) => (
                <AptCard key={m.title} variant="subtle" padding="dense">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-medium text-foreground">{m.title}</h3>
                        <AptTag variant={m.status === "completed" ? "success" : m.status === "in-progress" ? "accent" : "muted"}>
                          {m.status}
                        </AptTag>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-accent transition-all duration-default" style={{ width: `${m.progress}%` }} />
                      </div>
                    </div>
                    <Button variant={m.status === "completed" ? "outline" : "primary"} size="sm">
                      {m.status === "completed" ? "Review" : m.status === "in-progress" ? "Continue" : "Start"}
                    </Button>
                  </div>
                </AptCard>
              ))}
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" /> Sales tools & resources
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {salesTools.map((t) => (
                  <AptCard key={t.title} variant="interactive" padding="dense">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{t.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{t.description}</p>
                    <Button size="sm" variant="outline">{t.cta}</Button>
                  </AptCard>
                ))}
              </div>
            </AptCardContent>
          </AptCard>
        </div>

        <aside className="space-y-6">
          <AptCard variant="feature">
            <AptCardHeader>
              <AptCardTitle className="text-base">Quick actions</AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2">
              <Button variant="accent" className="w-full">Submit new lead</Button>
              <Button variant="outline" className="w-full">Request demo access</Button>
              <Button variant="outline" className="w-full">Partner support</Button>
            </AptCardContent>
          </AptCard>

          <AptCard variant="subtle">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" /> Marketing assets
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-1">
              {marketingAssets.map((a) => (
                <div key={a.name} className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-secondary transition-colors duration-fast">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.type} • {a.size}</p>
                  </div>
                  <Button size="icon" variant="ghost" aria-label={`Download ${a.name}`}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </AptCardContent>
          </AptCard>

          <AptCard variant="default">
            <AptCardHeader>
              <AptCardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> This month
              </AptCardTitle>
            </AptCardHeader>
            <AptCardContent className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Leads generated</span>
                <span className="font-medium text-foreground">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Closed deals</span>
                <span className="font-medium text-foreground">7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Commission earned</span>
                <span className="font-medium text-foreground">$4,250</span>
              </div>
            </AptCardContent>
          </AptCard>
        </aside>
      </div>
    </AptSection>
  )
}
