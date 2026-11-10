"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Briefcase,
  ChartColumn,
  Code,
  EllipsisVertical,
  Euro,
  Globe,
  Headset,
  Layers,
  MapPin,
  Megaphone,
  Palette,
  Plus,
  Trash2,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { JobFormData } from "./new/page"

type JobStatus = "Active" | "Expired"

export type JobPost = JobFormData & {
  id: string
  applicants: number
  status: JobStatus
  postedAgo: string
}

const CATEGORY_STYLES: Record<
  string,
  { icon: LucideIcon; tile: string; label: string }
> = {
  "Engineering & Tech": {
    icon: Code,
    tile: "bg-sky-500/15 text-sky-400",
    label: "text-sky-400",
  },
  "Design & Creative": {
    icon: Palette,
    tile: "bg-orange-500/15 text-orange-400",
    label: "text-orange-400",
  },
  "Product & Management": {
    icon: Layers,
    tile: "bg-indigo-500/15 text-indigo-400",
    label: "text-indigo-400",
  },
  "Marketing & Sales": {
    icon: Megaphone,
    tile: "bg-pink-500/15 text-pink-400",
    label: "text-pink-400",
  },
  "Finance & Accounting": {
    icon: Wallet,
    tile: "bg-emerald-500/15 text-emerald-400",
    label: "text-emerald-400",
  },
  "Customer Support": {
    icon: Headset,
    tile: "bg-amber-500/15 text-amber-400",
    label: "text-amber-400",
  },
  "Data & Analytics": {
    icon: ChartColumn,
    tile: "bg-cyan-500/15 text-cyan-400",
    label: "text-cyan-400",
  },
  Other: {
    icon: Briefcase,
    tile: "bg-muted text-muted-foreground",
    label: "text-muted-foreground",
  },
}

// Dummy data — same shape as the data submitted from the "Post a New Job" page
const DUMMY_JOBS: JobPost[] = [
  {
    id: "job-001",
    title: "Frontend Developer",
    companyName: "HirePulse Network",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    minSalary: "25",
    maxSalary: "40",
    salaryFrequency: "per hour",
    responsibilities: "",
    qualifications: "",
    applicants: 34,
    status: "Active",
    postedAgo: "4d ago",
  },
  {
    id: "job-002",
    title: "Senior Product Designer",
    companyName: "HirePulse Labs",
    category: "Design & Creative",
    jobType: "Full-time",
    isRemote: false,
    location: "London, UK (Hybrid)",
    deadline: "2025-06-14",
    minSalary: "90000",
    maxSalary: "115000",
    salaryFrequency: "per year",
    responsibilities: "",
    qualifications: "",
    applicants: 19,
    status: "Active",
    postedAgo: "1w ago",
  },
  {
    id: "job-003",
    title: "DevOps Specialist",
    companyName: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    location: "Berlin, Germany",
    deadline: "2025-06-30",
    minSalary: "95000",
    maxSalary: "120000",
    salaryFrequency: "per year",
    responsibilities: "",
    qualifications: "",
    applicants: 12,
    status: "Active",
    postedAgo: "2w ago",
  },
  {
    id: "job-004",
    title: "Product Marketing Lead",
    companyName: "HirePulse Network",
    category: "Marketing & Sales",
    jobType: "Full-time",
    isRemote: true,
    location: "EU/US",
    deadline: "2025-07-15",
    minSalary: "80000",
    maxSalary: "105000",
    salaryFrequency: "per year",
    responsibilities: "",
    qualifications: "",
    applicants: 27,
    status: "Active",
    postedAgo: "3d ago",
  },
  {
    id: "job-005",
    title: "QA Automation Engineer",
    companyName: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Part-time",
    isRemote: false,
    location: "Dublin, Ireland (Hybrid)",
    deadline: "2025-05-01",
    minSalary: "35",
    maxSalary: "50",
    salaryFrequency: "per hour",
    responsibilities: "",
    qualifications: "",
    applicants: 8,
    status: "Expired",
    postedAgo: "2w ago",
  },
]

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

function formatSalary(value: string) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return value

  return amount >= 1000 ? `€${Math.round(amount / 1000)}k` : `€${amount}`
}

function formatCompensation(job: JobFormData) {
  const frequency = job.salaryFrequency.replace("per ", "/ ")

  return `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)} ${frequency}`
}

function formatLocation(job: JobFormData) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<JobPost[]>(DUMMY_JOBS)

  const handleUpdate = (job: JobPost) => {
    console.log("Update job:", job.id, job.title)
  }

  const handleDelete = (job: JobPost) => {
    setJobs((prev) => prev.filter((item) => item.id !== job.id))
  }

  const handleMore = (job: JobPost) => {
    console.log("More options for job:", job.id, job.title)
  }

  return (
    <div className="px-6 py-8">
      {/* Header */}
      <p className="text-sm text-muted-foreground">
        Manage Jobs <span className="mx-1.5">›</span>{" "}
        <span className="text-primary">Job Listings &amp; Postings</span>
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className={cn(buttonVariants())}
        >
          <Plus data-icon="inline-start" />
          New Job Post
        </Link>
      </div>

      {/* Job posts table */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
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
              {jobs.map((job) => {
                const categoryStyle = CATEGORY_STYLES[job.category] ?? {
                  icon: Briefcase,
                  tile: "bg-muted text-muted-foreground",
                  label: "text-muted-foreground",
                }
                const CategoryIcon = categoryStyle.icon
                const isExpired = job.status === "Expired"

                return (
                  <tr
                    key={job.id}
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
                        {job.applicants} Candidates
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
                        {job.status}
                      </Badge>
                    </td>

                    <td className="hidden px-6 py-4 sm:table-cell">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">
                          {formatDeadline(job.deadline)}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          {isExpired ? "Closed" : `Posted ${job.postedAgo}`}
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

                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Delete ${job.title}`}
                          onClick={() => handleDelete(job)}
                        >
                          <Trash2 />
                        </Button>

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

          {jobs.length === 0 && (
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
      </div>
    </div>
  )
}
