"use client"

import { Panel } from "@/app/components/panel"
import { JobCard } from "@/components/jobs/job-card"
import { JobFilters, type JobFilterCounts } from "@/components/jobs/job-filters"
import { JobPagination } from "@/components/jobs/job-pagination"
import { JobSearchBar } from "@/components/jobs/job-search-bar"
import { JobSort } from "@/components/jobs/job-sort"
import type { JobPost } from "@/lib/types/jobs"

const countBy = (values: string[]) =>
  values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1
    return acc
  }, {})

type JobsBrowserProps = {
  jobs: JobPost[]
}

export function JobsBrowser({ jobs }: JobsBrowserProps) {
  const counts: JobFilterCounts = {
    jobTypes: countBy(jobs.map((job) => job.jobType)),
    categories: countBy(jobs.map((job) => job.category)),
    remoteOnly: jobs.filter((job) => job.isRemote).length,
  }

  return (
    <>
      {/* TODO: sync the search query with the URL */}
      <JobSearchBar onSearch={() => {}} />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[15rem_1fr]">
        <aside>
          <Panel className="p-4">
            {/* TODO: sync the filter state with the URL */}
            <JobFilters counts={counts} onChange={() => {}} />
          </Panel>
        </aside>

        <section>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-lg font-semibold">
              Found {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
            </h1>
            {/* TODO: sync the sort option with the URL */}
            <JobSort onValueChange={() => {}} />
          </div>

          <div className="mt-4 flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {jobs.length === 0 && (
            <Panel className="mt-4 px-6 py-16 text-center text-sm text-muted-foreground">
              No jobs found. Try adjusting your search or filters.
            </Panel>
          )}

          <JobPagination className="mt-8" />
        </section>
      </div>
    </>
  )
}
