import Link from "next/link"
import { Plus } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs"
import type { JobPost } from "@/lib/types/jobs"
import { PageHeader } from "@/app/components/page-header"
import ManageJobsTable from "./manage-jobs-table"

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
      <PageHeader
        breadcrumb="Manage Jobs"
        current="Job Listings & Postings"
        title="Manage Job Posts"
        description="Review live listings, monitor applicants, and update job details across your organization."
        action={
          <Link
            href="/dashboard/recruiter/jobs/new"
            className={cn(buttonVariants())}
          >
            <Plus data-icon="inline-start" />
            New Job Post
          </Link>
        }
      />

      {/* Job posts table (client component — owns the row actions) */}
      <ManageJobsTable jobs={jobs} />
    </div>
  )
}
