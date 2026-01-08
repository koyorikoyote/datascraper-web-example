import { useEffect, useState } from "react"
import { LoadingContext } from "./LoadingContext"
import { registerLoadingHandler } from "./external"
import { Spinner } from "@/components/ui/spinner"

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    registerLoadingHandler(setLoading)
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50">
          <Spinner className="size-12" />
        </div>
      )}
    </LoadingContext.Provider>
  )
}
