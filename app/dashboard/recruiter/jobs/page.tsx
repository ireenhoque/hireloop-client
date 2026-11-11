import Link from "next/link"
import { Plus } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs"
import ManageJobsTable, { type JobPost } from "./manage-jobs-table"

export default async function ManageJobsPage() {
  let jobs: JobPost[] = []

  try {
    const data = await getJobs()

    if (Array.isArray(data)) {
      jobs = data.map((job: Record<string, unknown>) => ({
        ...(job as JobPost),
        _id: String(job._id ?? job.id ?? crypto.randomUUID()),
      }))
    }
  } catch (error) {
    console.error("Failed to load jobs:", error)
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

      {/* Job posts table (client component — owns the row actions) */}
      <ManageJobsTable jobs={jobs} />
    </div>
  )
}
