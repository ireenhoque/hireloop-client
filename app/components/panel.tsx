import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PanelProps = {
  className?: string
  children: ReactNode
}

export function Panel({ className, children }: PanelProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10",
        className
      )}
    >
      {children}
    </div>
  )
}
