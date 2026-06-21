import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  label?: string
  lang?: string
}

export function CodeBlock({ code, label, lang }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="rounded-md border border-border bg-surface">
      {(label || lang) && (
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="text-xs font-medium text-muted-foreground">{label ?? lang}</span>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={copy} aria-label="Copy">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
      )}
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}
