"use client"

import { Checkbox } from "@/components/ui/checkbox"

type FilterCheckboxRowProps = {
  label: string
  checked: boolean
  count?: number
  onCheckedChange: () => void
}

export function FilterCheckboxRow({
  label,
  checked,
  count,
  onCheckedChange,
}: FilterCheckboxRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 transition-colors hover:text-foreground">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">{count}</span>
      )}
    </label>
  )
}
