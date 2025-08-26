import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Users, FileText, Award, Target, Download } from "lucide-react"

const partnerStats = [
  { label: "Active Partners", value: "2,847", change: "+12%" },
  { label: "Total Revenue", value: "$1.2M", change: "+24%" },
  { label: "Commission Rate", value: "15%", change: "Avg" },
]

const trainingModules = [
  { title: "Product Overview", status: "completed", progress: 100 },
  { title: "Sales Techniques", status: "in-progress", progress: 65 },
  { title: "Technical Deep Dive", status: "available", progress: 0 },
  { title: "Customer Success", status: "available", progress: 0 },
]

const marketingAssets = [
  { name: "Brand Guidelines", type: "PDF", size: "2.4 MB" },
  { name: "Logo Pack", type: "ZIP", size: "15.8 MB" },
  { name: "Product Brochure", type: "PDF", size: "3.1 MB" },
  { name: "Case Studies", type: "PDF", size: "5.2 MB" },
  { name: "Demo Videos", type: "MP4", size: "247 MB" },
]

export default function Resellers() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Partner Portal</h1>
            <p className="text-muted-foreground">Resources, training, and tools for resellers</p>
          </div>
        </div>
        <Badge variant="secondary">Business Resources</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {partnerStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    stat.change.includes('+') ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Training & Certification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Training & Certification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Complete our training modules to become a certified partner and unlock higher commission rates.
              </p>
              <div className="space-y-4">
                {trainingModules.map((module, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{module.title}</h3>
                        <Badge 
                          variant={module.status === 'completed' ? 'default' : 
                                  module.status === 'in-progress' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {module.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button 
                      variant={module.status === 'completed' ? 'outline' : 'default'} 
                      size="sm" 
                      className="ml-4"
                    >
                      {module.status === 'completed' ? 'Review' : 
                       module.status === 'in-progress' ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sales Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Sales Tools & Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">💰 Pricing Calculator</h3>
                  <p className="text-sm text-muted-foreground mb-3">Generate custom quotes for prospects</p>
                  <Button size="sm" variant="outline">Open Tool</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">📊 ROI Templates</h3>
                  <p className="text-sm text-muted-foreground mb-3">Show value to potential customers</p>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">🎯 Lead Tracker</h3>
                  <p className="text-sm text-muted-foreground mb-3">Manage your sales pipeline</p>
                  <Button size="sm" variant="outline">Access</Button>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">📈 Performance Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-3">Track your sales metrics</p>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="gradient">
                Submit New Lead
              </Button>
              <Button variant="outline" className="w-full">
                Request Demo Access
              </Button>
              <Button variant="outline" className="w-full">
                Partner Support
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Marketing Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {marketingAssets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.type} • {asset.size}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="p-1">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Leads Generated</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Closed Deals</span>
                  <span className="font-medium">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Commission Earned</span>
                  <span className="font-medium">$4,250</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}