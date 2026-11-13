"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SORT_OPTIONS = [
  "Most Recent",
  "Relevance",
  "Salary: High to Low",
  "Salary: Low to High",
]

type JobSortProps = {
  value?: string
  onValueChange?: (value: string) => void
}

export function JobSort({ value = "Most Recent", onValueChange }: JobSortProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden sm:inline">Sort by:</span>

      <Select
        value={value}
        onValueChange={(value) => {
          if (value !== null) onValueChange?.(value)
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
