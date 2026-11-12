"use client"

import { Bookmark, Euro, Globe } from "lucide-react"

import { Panel } from "@/app/components/panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CATEGORY_STYLES, FALLBACK_CATEGORY_STYLE } from "@/lib/category-styles"
import { formatCompensation, formatLocation } from "@/lib/format"
import type { JobPost } from "@/lib/types/jobs"

type JobCardProps = {
  job: JobPost
  onBookmark?: (job: JobPost) => void
}

export function JobCard({ job, onBookmark }: JobCardProps) {
  const categoryStyle = CATEGORY_STYLES[job.category] ?? FALLBACK_CATEGORY_STYLE
  const CategoryIcon = categoryStyle.icon

  return (
    <Panel className="p-5">
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            categoryStyle.tile
          )}
        >
          <CategoryIcon className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold">{job.title}</h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {job.companyName} &bull; {formatLocation(job)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-md border-border bg-input/30 text-foreground"
            >
              <Euro />
              {formatCompensation(job)}
            </Badge>

            <Badge
              variant="outline"
              className="rounded-md border-border bg-input/30 text-foreground"
            >
              {job.jobType}
            </Badge>

            {job.isRemote && (
              <Badge
                variant="outline"
                className="rounded-md border-border bg-input/30 text-foreground"
              >
                <Globe />
                Remote
              </Badge>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
          aria-label={`Bookmark ${job.title}`}
          onClick={() => onBookmark?.(job)}
        >
          <Bookmark />
        </Button>
      </div>
    </Panel>
  )
}
