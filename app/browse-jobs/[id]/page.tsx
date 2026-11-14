
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Box,
  Brain,
  Building2,
  ChartColumn,
  CircleDollarSign,
  Clock,
  MapPin,
  Monitor,
  Palette,
  PenTool,
  Plane,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

import { Panel } from "@/app/components/panel"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { JobActions } from "@/components/jobs/job-actions"
import { getJobById } from "@/lib/api/jobs"
import { CATEGORY_STYLES, FALLBACK_CATEGORY_STYLE } from "@/lib/category-styles"
import { formatCompensation, formatLocation } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { JobPost } from "@/lib/types/jobs"

// Demo content for sections the API does not provide yet.
// Real data (title, salary, responsibilities, qualifications, ...) always wins when available.
const DEMO_EXPERIENCE = "5+ Years"
const DEMO_COMPANY_SIZE = "250 - 500 Employees"

const DEMO_SKILLS: { icon: LucideIcon; label: string }[] = [
  { icon: PenTool, label: "Figma Expert" },
  { icon: Brain, label: "System Thinking" },
  { icon: Palette, label: "UI/UX Design" },
  { icon: Box, label: "Basic Frontend" },
]

const DEMO_BENEFITS: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Full Health & Dental" },
  { icon: CircleDollarSign, label: "Competitive 401k" },
  { icon: Monitor, label: "Latest Hardware Stipend" },
  { icon: Plane, label: "Unlimited PTO" },
]

// Split a textarea value ("one item per line") into clean bullet items.
const toList = (value: string) =>
  value
    .split("\n")
    .map((line) => line.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean)

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <Panel className="p-4">
      <p className="flex items-center gap-1.5 text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
        <Icon className="size-3.5" />
        {label}
      </p>
      <p className="mt-2 truncate text-sm font-semibold">{value}</p>
    </Panel>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
        >
          <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const JobDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const job = await getJobById(id) as JobPost | null

  if (!job?._id) {
    notFound()
  }

  const categoryStyle = CATEGORY_STYLES[job.category] ?? FALLBACK_CATEGORY_STYLE
  const CategoryIcon = categoryStyle.icon

  return (
    <>
      <SiteNavbar />

      <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-5">
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to all jobs
        </Link>

        {/* Header */}
        <Panel className="mt-4 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-xl",
                  categoryStyle.tile
                )}
              >
                <CategoryIcon className="size-6" />
              </span>

              <div className="min-w-0">
                <h1 className="text-2xl font-semibold">{job.title}</h1>
                <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  {job.companyName}
                  <span className="text-border">&bull;</span>
                  <span className="flex items-center gap-1 font-medium text-emerald-400">
                    <BadgeCheck className="size-4" />
                    Verified Employer
                  </span>
                </p>
              </div>
            </div>

            <JobActions
              jobId={job._id}
              jobTitle={job.title}
              companyName={job.companyName}
            />
          </div>
        </Panel>

        {/* Info tiles */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoTile
            icon={Banknote}
            label="Salary Range"
            value={formatCompensation(job)}
          />
          <InfoTile icon={MapPin} label="Location" value={formatLocation(job)} />
          <InfoTile icon={Clock} label="Job Type" value={job.jobType} />
          <InfoTile icon={ChartColumn} label="Experience" value={DEMO_EXPERIENCE} />
        </div>

        {/* Content + company overview */}
        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[1fr_18rem]">
          <Panel className="p-6">
            <section>
              <h2 className="text-base font-semibold">Job Description</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                At {job.companyName}, we are building the next generation of products
                that users love. We are looking for a {job.title} who is passionate
                about translating complex technical workflows into elegant, intuitive
                interfaces. You will be a key member of our design team, working
                closely with engineering and product leadership to define the vision
                for our core platform experience.
              </p>
            </section>

            <Separator className="my-6" />

            <section>
              <h2 className="text-base font-semibold">Responsibilities</h2>
              <div className="mt-4">
                <BulletList items={toList(job.responsibilities)} />
              </div>
            </section>

            <Separator className="my-6" />

            <section>
              <h2 className="text-base font-semibold">Requirements</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {DEMO_SKILLS.map((skill) => (
                  <Badge
                    key={skill.label}
                    variant="outline"
                    className="rounded-md border-border bg-input/30 font-medium text-foreground"
                  >
                    <skill.icon className="size-3.5" />
                    {skill.label}
                  </Badge>
                ))}
              </div>

              <div className="mt-4">
                <BulletList items={toList(job.qualifications)} />
              </div>
            </section>

            <Separator className="my-6" />

            <section>
              <h2 className="text-base font-semibold">Benefits</h2>

              <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {DEMO_BENEFITS.map((benefit) => (
                  <div key={benefit.label} className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <benefit.icon className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{benefit.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </Panel>

          {/* Company overview */}
          <Panel className="p-5">
            <h2 className="text-base font-semibold">Company Overview</h2>

            {/* Placeholder image until company logos are stored with the job */}
            <div className="mt-4 flex aspect-video items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Building2 className="size-8" />
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="shrink-0 text-xs tracking-wide text-muted-foreground uppercase">
                  Size
                </span>
                <span className="text-right font-medium">{DEMO_COMPANY_SIZE}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="shrink-0 text-xs tracking-wide text-muted-foreground uppercase">
                  Industry
                </span>
                <span className="text-right font-medium">{job.category}</span>
              </div>
            </div>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-6 w-full"
              )}
            >
              Visit Website
            </Link>
          </Panel>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

export default JobDetailsPage
