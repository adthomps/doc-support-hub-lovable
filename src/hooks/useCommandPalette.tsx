import { createContext, useContext, useState, type ReactNode } from "react"

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void }

const CommandPaletteContext = createContext<Ctx | null>(null)

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, toggle: () => setOpen(!open) }}>
      {children}
    </CommandPaletteContext.Provider>
  )
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider")
  return ctx
}
