import { useContext } from "react"
import { LoadingContext } from "./LoadingContext"

export function useLoading() {
  const ctx = useContext(LoadingContext)
  if (!ctx) throw new Error("useLoading must be used inside <LoadingProvider>")
  return ctx
}
