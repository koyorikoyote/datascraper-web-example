import { createContext } from "react"

export interface LoadingContextValue {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextValue | null>(null)
