import { AptSection } from "@/components/apt/AptSection"
import { EmptyState } from "@/components/apt/EmptyState"
import { Button } from "@/components/ui/button"
import { Construction, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface ComingSoonProps {
  eyebrow: string
  title: string
  description: string
}

export default function ComingSoon({ eyebrow, title, description }: ComingSoonProps) {
  return (
    <AptSection spacing="compact" width="wide" eyebrow={eyebrow} title={title} description={description}>
      <EmptyState
        icon={Construction}
        title="This page is coming soon"
        description="We're putting the finishing touches on this content. Check back shortly or head back to the docs home."
        action={
          <Button variant="outline" asChild>
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Back to home</Link>
          </Button>
        }
      />
    </AptSection>
  )
}
