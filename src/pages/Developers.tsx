import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, FileText, Zap, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"

const codeExample = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'`

export default function Developers() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Developer Documentation</h1>
            <p className="text-muted-foreground">APIs, SDKs, and integration guides</p>
          </div>
        </div>
        <Badge variant="secondary">Technical Documentation</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Start */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Get up and running with our API in minutes. Follow these simple steps to make your first API call.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <span>Get your API key from the dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <span>Install our SDK or use direct HTTP requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <span>Make your first API call</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Example Request</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={copyCode}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code className="font-mono">{codeExample}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete reference for all API endpoints, parameters, and responses.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Authentication</h3>
                  <p className="text-sm text-muted-foreground">API keys, OAuth, and security</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Users API</h3>
                  <p className="text-sm text-muted-foreground">Manage user accounts and profiles</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Webhooks</h3>
                  <p className="text-sm text-muted-foreground">Real-time event notifications</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Rate Limits</h3>
                  <p className="text-sm text-muted-foreground">Usage limits and best practices</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SDKs & Libraries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                JavaScript/Node.js
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Python
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                PHP
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Ruby
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Developer Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                API Explorer
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Postman Collection
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                OpenAPI Spec
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status & Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">All systems operational</span>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Status Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}