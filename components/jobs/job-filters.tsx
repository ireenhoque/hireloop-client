"use client"

import { useState } from "react"

import { FilterCheckboxRow } from "@/components/jobs/filters/filter-checkbox-row"
import { FilterSection } from "@/components/jobs/filters/filter-section"
import { Input } from "@/components/ui/input"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/jobs"

export type JobFilterState = {
  jobType: string
  category: string
  remoteOnly: boolean
  minSalary: string
  maxSalary: string
}

export type JobFilterCounts = {
  jobTypes?: Record<string, number>
  categories?: Record<string, number>
  remoteOnly?: number
}

type JobFiltersProps = {
  counts?: JobFilterCounts
  onChange?: (filters: JobFilterState) => void
}

export function JobFilters({ counts, onChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilterState>({
    jobType: "",
    category: "",
    remoteOnly: false,
    minSalary: "",
    maxSalary: "",
  })

  const update = (patch: Partial<JobFilterState>) => {
    const next = { ...filters, ...patch }

    setFilters(next)
    onChange?.(next)
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-base font-semibold">Filters</h2>

      <FilterSection title="Job Type">
        {JOB_TYPES.map((type) => (
          <FilterCheckboxRow
            key={type}
            label={type}
            checked={filters.jobType === type}
            count={counts?.jobTypes?.[type]}
            onCheckedChange={() =>
              update({ jobType: filters.jobType === type ? "" : type })
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Work Mode">
        <FilterCheckboxRow
          label="Remote only"
          checked={filters.remoteOnly}
          count={counts?.remoteOnly}
          onCheckedChange={() => update({ remoteOnly: !filters.remoteOnly })}
        />
      </FilterSection>

      <FilterSection title="Category">
        {JOB_CATEGORIES.map((category) => (
          <FilterCheckboxRow
            key={category}
            label={category}
            checked={filters.category === category}
            count={counts?.categories?.[category]}
            onCheckedChange={() =>
              update({
                category: filters.category === category ? "" : category,
              })
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Salary Range">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            aria-label="Minimum salary"
            value={filters.minSalary}
            onChange={(event) => update({ minSalary: event.target.value })}
          />
          <Input
            type="number"
            min={0}
            placeholder="Max"
            aria-label="Maximum salary"
            value={filters.maxSalary}
            onChange={(event) => update({ maxSalary: event.target.value })}
          />
        </div>
      </FilterSection>
    </div>
  )
}
