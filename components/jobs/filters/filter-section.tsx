import type { ReactNode } from "react"

type FilterSectionProps = {
  title: string
  children: ReactNode
}

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-2.5 flex flex-col gap-2.5">{children}</div>
    </div>
  )
}
