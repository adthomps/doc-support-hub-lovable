import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Video, HelpCircle, Star, ArrowRight } from "lucide-react"

const popularGuides = [
  { title: "Getting Started Guide", views: "12.5k", rating: 4.9, time: "5 min read" },
  { title: "Account Settings", views: "8.2k", rating: 4.8, time: "3 min read" },
  { title: "Billing & Payments", views: "6.1k", rating: 4.7, time: "4 min read" },
  { title: "Privacy Settings", views: "4.3k", rating: 4.6, time: "2 min read" },
]

const videoTutorials = [
  { title: "Platform Overview", duration: "12:34", thumbnail: "🎯" },
  { title: "Advanced Features", duration: "18:45", thumbnail: "⚡" },
  { title: "Mobile App Guide", duration: "8:22", thumbnail: "📱" },
]

export default function Customers() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Customer Help Center</h1>
            <p className="text-muted-foreground">User guides, tutorials, and support articles</p>
          </div>
        </div>
        <Badge variant="secondary">User-Friendly</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Popular Guides */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Popular Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularGuides.map((guide, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
                    <div className="flex-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{guide.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{guide.views} views</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{guide.rating}</span>
                        </div>
                        <span>{guide.time}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Tutorials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {videoTutorials.map((video, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center mb-3 group-hover:shadow-glow transition-all">
                      <div className="text-4xl">{video.thumbnail}</div>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">🚀 Getting Started</h3>
                  <p className="text-sm text-muted-foreground mb-3">Basic setup and initial configuration</p>
                  <span className="text-xs text-primary">15 articles</span>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">⚙️ Account Management</h3>
                  <p className="text-sm text-muted-foreground mb-3">Profile, settings, and preferences</p>
                  <span className="text-xs text-primary">23 articles</span>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">💳 Billing & Payments</h3>
                  <p className="text-sm text-muted-foreground mb-3">Subscriptions, invoices, and payments</p>
                  <span className="text-xs text-primary">12 articles</span>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">🔧 Troubleshooting</h3>
                  <p className="text-sm text-muted-foreground mb-3">Common issues and solutions</p>
                  <span className="text-xs text-primary">18 articles</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="gradient">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                Live Chat
              </Button>
              <Button variant="outline" className="w-full">
                Community Forum
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Quick FAQ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium mb-1">How do I reset my password?</p>
                <p className="text-muted-foreground">Click "Forgot Password" on the login page...</p>
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">How do I cancel my subscription?</p>
                <p className="text-muted-foreground">Go to Account Settings &gt; Billing...</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                View All FAQs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Downloads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                Mobile App (iOS)
                <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Mobile App (Android)
                <span className="text-xs text-muted-foreground">v2.1.0</span>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Desktop App
                <span className="text-xs text-muted-foreground">v1.5.2</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}