"use client"

import { useState } from "react"
import Link from "next/link"
import {
  EllipsisVertical,
  Euro,
  Globe,
  MapPin,
  Plus,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { JobPost } from "@/lib/types/jobs"
import { CATEGORY_STYLES, FALLBACK_CATEGORY_STYLE } from "@/lib/category-styles"
import { formatCompensation, formatLocation } from "@/lib/format"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { Panel } from "@/app/components/panel"

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function formatDeadline(value: string) {
  const [year, month, day] = value.split("-").map(Number)

  if (!year || !month || !day) return value

  return `${MONTHS[month - 1]} ${day}, ${year}`
}

export default function ManageJobsTable({ jobs }: { jobs: JobPost[] }) {
  const [rows, setRows] = useState<JobPost[]>(jobs)

  const handleUpdate = (job: JobPost) => {
    console.log("Update job:", job._id, job.title)
  }

  const handleDelete = (job: JobPost) => {
    setRows((prev) => prev.filter((item) => item._id !== job._id))
  }

  const handleMore = (job: JobPost) => {
    console.log("More options for job:", job._id, job.title)
  }

  return (
    <Panel className="mt-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-2xl text-left">
          <thead>
            <tr className="border-b border-border text-[0.7rem] font-medium tracking-wider text-muted-foreground uppercase">
              <th className="px-6 py-4">Job Title &amp; Dept</th>
              <th className="hidden px-6 py-4 lg:table-cell">
                Company &amp; Location
              </th>
              <th className="px-6 py-4">Type</th>
              <th className="hidden px-6 py-4 md:table-cell">Compensation</th>
              <th className="hidden px-6 py-4 md:table-cell">Applicants</th>
              <th className="px-6 py-4">Status</th>
              <th className="hidden px-6 py-4 sm:table-cell">Deadline</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {rows.map((job) => {
              const categoryStyle =
                CATEGORY_STYLES[job.category] ?? FALLBACK_CATEGORY_STYLE
              const CategoryIcon = categoryStyle.icon
              const isExpired = job.status === "Expired"

              return (
                <tr
                  key={job._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          categoryStyle.tile
                        )}
                      >
                        <CategoryIcon className="size-4" />
                      </span>

                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-semibold">
                          {job.title}
                        </span>
                        <span className={cn("text-xs", categoryStyle.label)}>
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="hidden px-6 py-4 lg:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {job.companyName}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {job.isRemote ? (
                          <Globe className="size-3 text-primary" />
                        ) : (
                          <MapPin className="size-3 text-primary" />
                        )}
                        {formatLocation(job)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className="rounded-md border-border bg-input/30 text-foreground"
                    >
                      {job.jobType}
                    </Badge>
                  </td>

                  <td className="hidden px-6 py-4 md:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Euro className="size-3.5 text-primary" />
                      {formatCompensation(job)}
                    </span>
                  </td>

                  <td className="hidden px-6 py-4 md:table-cell">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Users className="size-3.5 text-primary" />
                      {job.applicants ?? 0} Candidates
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <Badge
                      className={cn(
                        "rounded-md",
                        isExpired
                          ? "bg-input/40 text-muted-foreground"
                          : "bg-emerald-500/15 text-emerald-400"
                      )}
                    >
                      <span
                        className="size-1.5 rounded-full bg-current"
                        aria-hidden="true"
                      />
                      {job.status ?? "Active"}
                    </Badge>
                  </td>

                  <td className="hidden px-6 py-4 sm:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {formatDeadline(job.deadline)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {isExpired
                          ? "Closed"
                          : job.postedAgo
                            ? `Posted ${job.postedAgo}`
                            : ""}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleUpdate(job)}
                      >
                        Update
                      </Button>

                      <DeleteJobDialog
                        job={job}
                        onDeleted={() => handleDelete(job)}
                      />

                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground"
                        aria-label={`More options for ${job.title}`}
                        onClick={() => handleMore(job)}
                      >
                        <EllipsisVertical />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <p className="font-medium">No job posts yet</p>
            <p className="text-sm text-muted-foreground">
              Publish your first listing to start receiving candidates.
            </p>

            <Link
              href="/dashboard/recruiter/jobs/new"
              className={cn(buttonVariants({ size: "sm" }), "mt-2")}
            >
              <Plus data-icon="inline-start" />
              New Job Post
            </Link>
          </div>
        )}
      </div>
    </Panel>
  )
}
