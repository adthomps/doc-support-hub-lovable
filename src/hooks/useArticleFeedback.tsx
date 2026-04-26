import { useCallback, useEffect, useState } from "react"

export type Vote = "up" | "down" | null
export type FeedbackEntry = { vote: Exclude<Vote, null>; comment?: string; at: string }
type Store = Record<string, FeedbackEntry>

const KEY = "apt:article-feedback:v1"

function read(): Store {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store
  } catch {
    return {}
  }
}

function write(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
    window.dispatchEvent(new CustomEvent("apt:feedback-changed"))
  } catch {
    /* ignore quota */
  }
}

const articleKey = (audience: string, slug: string) => `${audience}/${slug}`

export function useArticleFeedback(audience: string, slug: string) {
  const id = articleKey(audience, slug)
  const [entry, setEntry] = useState<FeedbackEntry | null>(() => read()[id] ?? null)

  useEffect(() => {
    const onChange = () => setEntry(read()[id] ?? null)
    window.addEventListener("apt:feedback-changed", onChange)
    window.addEventListener("storage", onChange)
    return () => {
      window.removeEventListener("apt:feedback-changed", onChange)
      window.removeEventListener("storage", onChange)
    }
  }, [id])

  const setVote = useCallback(
    (vote: Exclude<Vote, null>, comment?: string) => {
      const store = read()
      store[id] = { vote, comment: comment?.trim() || undefined, at: new Date().toISOString() }
      write(store)
      setEntry(store[id])
    },
    [id]
  )

  const clear = useCallback(() => {
    const store = read()
    delete store[id]
    write(store)
    setEntry(null)
  }, [id])

  return { entry, vote: entry?.vote ?? null, setVote, clear }
}

export function useAllFeedback() {
  const [store, setStore] = useState<Store>(() => read())
  useEffect(() => {
    const onChange = () => setStore(read())
    window.addEventListener("apt:feedback-changed", onChange)
    window.addEventListener("storage", onChange)
    return () => {
      window.removeEventListener("apt:feedback-changed", onChange)
      window.removeEventListener("storage", onChange)
    }
  }, [])
  return store
}
