import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { AptBreadcrumbs } from "@/components/apt/AptBreadcrumbs"
import { CommandPaletteProvider, useCommandPalette } from "@/hooks/useCommandPalette"
import { CommandPalette } from "@/components/CommandPalette"

interface LayoutProps {
  children: React.ReactNode
}

function GlobalPalette() {
  const { open, setOpen } = useCommandPalette()
  return <CommandPalette open={open} onOpenChange={setOpen} />
}

export function Layout({ children }: LayoutProps) {
  return (
    <CommandPaletteProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <AptBreadcrumbs />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <GlobalPalette />
      </SidebarProvider>
    </CommandPaletteProvider>
  )
}
