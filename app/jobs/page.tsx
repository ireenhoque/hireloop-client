import Link from "next/link"
import { MapPin, SearchX } from "lucide-react"

import { SiteNavbar } from "@/components/site-navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Job = {
  title: string
  company: string
  location: string
  type: string
  salary: string
  tags: string[]
}

const jobs: Job[] = [
  {
    title: "Product Designer",
    company: "Nova Labs",
    location: "Remote",
    type: "Full-time",
    salary: "$120K - $150K",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    title: "AI Engineer",
    company: "Cortex AI",
    location: "Remote",
    type: "Full-time",
    salary: "$150K - $190K",
    tags: ["Python", "LLMs", "PyTorch"],
  },
  {
    title: "AI Engineering Lead",
    company: "Synthetix",
    location: "Manila, PH",
    type: "Full-time",
    salary: "₱280K - ₱360K / mo",
    tags: ["Machine Learning", "MLOps", "Leadership"],
  },
  {
    title: "Dev-ops Engineer",
    company: "CloudForge",
    location: "Remote",
    type: "Contract",
    salary: "$90 - $120 / hr",
    tags: ["Kubernetes", "AWS", "Terraform"],
  },
  {
    title: "Senior Frontend Engineer",
    company: "Loopwork",
    location: "Cebu, PH",
    type: "Full-time",
    salary: "₱200K - ₱260K / mo",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    title: "Data Analyst",
    company: "Brightmetrics",
    location: "Quezon City, PH",
    type: "Part-time",
    salary: "₱90K - ₱120K / mo",
    tags: ["SQL", "Power BI", "Python"],
  },
  {
    title: "Mobile Engineer",
    company: "AppVoyage",
    location: "Remote",
    type: "Full-time",
    salary: "$110K - $140K",
    tags: ["React Native", "iOS", "Android"],
  },
]

function asString(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : ""
}

async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query: rawQuery, location: rawLocation } = await searchParams
  const query = asString(rawQuery).toLowerCase()
  const location = asString(rawLocation).toLowerCase()

  const matches = jobs.filter((job) => {
    const haystack = `${job.title} ${job.company} ${job.tags.join(" ")}`.toLowerCase()
    const matchesQuery = !query || haystack.includes(query)
    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location) ||
      (location === "remote" && job.location === "Remote")
    return matchesQuery && matchesLocation
  })

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <header className="pt-10 sm:pt-14">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse Jobs
          </h1>
          <p className="mt-2 text-sm text-foreground/60 sm:text-base">
            {query || location
              ? "Showing jobs matching your search — refine the terms to see more."
              : "Thousands of curated opportunities from world-class companies."}
            {(query || location) && (
              <span className="mt-1 block text-xs text-foreground/50">
                Filters: {[
                  query && `“${rawQuery}”`,
                  location && `near ${rawLocation}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            )}
          </p>
        </header>

        {matches.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-xl border border-border/50 bg-card/40 px-6 py-14 text-center">
            <SearchX className="size-8 text-foreground/40" />
            <p className="mt-4 font-medium">No jobs found</p>
            <p className="mt-1 text-sm text-foreground/60">
              Try different keywords or browse all open roles.
            </p>
            <Button render={<Link href="/jobs" />} nativeButton={false} className="mt-5">
              Browse all jobs
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-3 sm:gap-4 lg:grid-cols-2">
            {matches.map((job) => (
              <Card
                key={`${job.company}-${job.title}`}
                className="border-border/50 bg-card/40 backdrop-blur-[2px]"
              >
                <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-medium">{job.title}</h2>
                      <p className="mt-0.5 text-sm text-foreground/60">
                        {job.company}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/60">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {job.location}
                    </span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-xs text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    render={<Link href={`/jobs?query=${encodeURIComponent(job.title)}`} />}
                    nativeButton={false}
                    variant="outline"
                    size="sm"
                    className="mt-1 self-start"
                  >
                    View role
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default JobsPage
