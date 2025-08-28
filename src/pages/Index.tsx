import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Book, Code, Users, Zap, Search, FileText, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
// Removing image import for now to test if it's causing the issue
// import heroImage from "@/assets/hero-docs.jpg"

const audienceCards = [
  {
    title: "Developers",
    description: "APIs, SDKs, and integration guides to build powerful applications",
    icon: Code,
    href: "/developers",
    features: ["REST API Reference", "SDKs & Libraries", "Code Examples", "Webhooks"],
    badge: "Technical"
  },
  {
    title: "Customers", 
    description: "User guides, tutorials, and help articles for end users",
    icon: Users,
    href: "/customers",
    features: ["Getting Started", "Feature Guides", "Troubleshooting", "Best Practices"],
    badge: "User-Friendly"
  },
  {
    title: "Resellers",
    description: "Partner resources, training materials, and business tools",
    icon: Zap,
    href: "/resellers",
    features: ["Partner Portal", "Training Materials", "Marketing Assets", "Support Tools"],
    badge: "Business"
  }
]

const quickLinks = [
  { title: "Getting Started", href: "/getting-started", icon: Book },
  { title: "API Reference", href: "/api", icon: FileText },
  { title: "FAQ", href: "/faq", icon: MessageCircle },
  { title: "Contact Support", href: "/support", icon: MessageCircle },
]

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Temporarily removing background image to debug */}
        <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
        <div className="relative container mx-auto px-6 py-20 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Documentation & Support Center
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Everything you need to build, integrate, and succeed with our platform. 
            Find guides, references, and support tailored to your role.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/getting-started">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Browse Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gradient-card border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation, guides, and articles..."
                className="w-full pl-12 pr-4 py-4 border border-input rounded-xl bg-background text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Audience Selection */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role to access tailored documentation and resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {audienceCards.map((card) => (
              <Card key={card.title} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                      <card.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {card.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{card.title}</CardTitle>
                  <CardDescription className="text-base">{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="gradient" className="w-full" asChild>
                    <Link to={card.href}>
                      Explore {card.title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Access</h2>
            <p className="text-lg text-muted-foreground">
              Jump directly to commonly used resources
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quickLinks.map((link) => (
              <Card key={link.title} className="group hover:shadow-medium transition-all duration-300 bg-background border-0">
                <CardContent className="p-6 text-center">
                  <link.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{link.title}</h3>
                  <Button variant="ghost" size="sm" asChild className="text-primary">
                    <Link to={link.href}>
                      View <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
