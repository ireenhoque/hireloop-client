import { getJobs } from "@/lib/api/jobs"

import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { JobsBrowser } from "@/components/jobs/jobs-browser"
import type { JobPost } from "@/lib/types/jobs"

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const query = new URLSearchParams(search as Record<string, string>).toString()
  const jobs = (await getJobs(query)) as JobPost[]

  return (
    <>
      <SiteNavbar />

      <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-5">
        <JobsBrowser jobs={jobs} />
      </main>

      <SiteFooter />
    </>
  )
}

export default BrowseJobsPage
