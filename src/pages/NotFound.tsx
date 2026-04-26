import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { FileQuestion, Search, Home, LifeBuoy } from "lucide-react"
import { AptSection } from "@/components/apt/AptSection"
import { EmptyState } from "@/components/apt/EmptyState"
import { Button } from "@/components/ui/button"
import { useCommandPalette } from "@/hooks/useCommandPalette"

const NotFound = () => {
  const location = useLocation()
  const { setOpen } = useCommandPalette()

  useEffect(() => {
    console.error("404 Error: route not found:", location.pathname)
  }, [location.pathname])

  return (
    <AptSection spacing="default" width="content">
      <EmptyState
        icon={FileQuestion}
        title="Page not found"
        description={`We couldn't find anything at ${location.pathname}. Try searching, or jump back to a known location.`}
        action={
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="accent" asChild>
              <Link to="/"><Home className="h-4 w-4 mr-1.5" />Home</Link>
            </Button>
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Search className="h-4 w-4 mr-1.5" />Search
            </Button>
            <Button variant="outline" asChild>
              <Link to="/support"><LifeBuoy className="h-4 w-4 mr-1.5" />Support</Link>
            </Button>
          </div>
        }
      />
    </AptSection>
  )
}

export default NotFound
