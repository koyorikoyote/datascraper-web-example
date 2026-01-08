import * as React from "react"
import { RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <RotateCw
      data-slot="spinner"
      className={cn("size-8 animate-spin text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Spinner }
