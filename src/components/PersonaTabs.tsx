import { useSearchParams } from "react-router-dom"
import { useMemo } from "react"
import { AptTag } from "@/components/apt/AptTag"
import { personasByAudience, type Audience, type Persona } from "@/content/articles"

type PersonaSelection = Persona | "all"

export function usePersona(audience: Audience) {
  const [params, setParams] = useSearchParams()
  const raw = params.get("persona") ?? "all"
  const valid = useMemo(() => {
    const ids = personasByAudience[audience].map((p) => p.id) as string[]
    return raw === "all" || ids.includes(raw) ? (raw as PersonaSelection) : "all"
  }, [audience, raw])

  const setPersona = (next: PersonaSelection) => {
    const p = new URLSearchParams(params)
    if (next === "all") p.delete("persona")
    else p.set("persona", next)
    setParams(p, { replace: true })
  }

  const meta = personasByAudience[audience].find((p) => p.id === valid)
  return { persona: valid, setPersona, description: meta?.description }
}

export function PersonaTabs({
  audience,
  persona,
  onChange,
}: {
  audience: Audience
  persona: PersonaSelection
  onChange: (p: PersonaSelection) => void
}) {
  const options = personasByAudience[audience]
  const all: { id: PersonaSelection; label: string }[] = [
    { id: "all", label: "All" },
    ...options.map((o) => ({ id: o.id as PersonaSelection, label: o.label })),
  ]
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by role">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground mr-1">Role</span>
      {all.map((o) => (
        <button
          key={o.id}
          role="tab"
          aria-selected={persona === o.id}
          onClick={() => onChange(o.id)}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <AptTag variant={persona === o.id ? "accent" : "muted"} className="cursor-pointer">
            {o.label}
          </AptTag>
        </button>
      ))}
    </div>
  )
}
