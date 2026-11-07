"use client"

import { MapPin, Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

function SearchBar() {
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const params = new URLSearchParams()
    const query = String(data.get("query") ?? "").trim()
    const location = String(data.get("location") ?? "").trim()
    if (query) params.set("query", query)
    if (location) params.set("location", location)

    router.push(params.size > 0 ? `/jobs?${params.toString()}` : "/jobs")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-2xl flex-col gap-1.5 rounded-xl border border-border/60 bg-card/50 p-1.5 backdrop-blur-[2px] sm:flex-row"
    >
      <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-stretch sm:gap-0">
        <div className="flex flex-1 items-center gap-2 px-3 py-2.5">
          <Search className="size-4 shrink-0 text-foreground/50" />
          <input
            type="search"
            name="query"
            aria-label="Job title, skill or company"
            placeholder="Job title, skill or company"
            className="h-7 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-foreground/50"
          />
        </div>
        <span
          aria-hidden="true"
          className="my-2 hidden w-px shrink-0 self-stretch bg-border/70 sm:block"
        />
        <div className="flex flex-1 items-center gap-2 px-3 py-2.5">
          <MapPin className="size-4 shrink-0 text-foreground/50" />
          <input
            type="search"
            name="location"
            aria-label="Location or Remote"
            placeholder="Location or Remote"
            className="h-7 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-foreground/50"
          />
        </div>
      </div>
      <Button
        size="icon-lg"
        type="submit"
        aria-label="Search"
        className="self-end sm:m-1.5 sm:self-auto"
      >
        <Search className="size-4" />
      </Button>
    </form>
  )
}

export { SearchBar }
