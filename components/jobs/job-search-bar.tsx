"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Panel } from "@/app/components/panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type JobSearchBarProps = {
  onSearch?: (query: string) => void
}

export function JobSearchBar({ onSearch }: JobSearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch?.(query)
  }

  return (
    <Panel className="p-3">
      <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by job title, keywords..."
            className="h-10 pl-9"
            aria-label="Search jobs"
          />
        </div>

        <Button type="submit" size="lg" className="px-6">
          Search Jobs
        </Button>
      </form>
    </Panel>
  )
}
