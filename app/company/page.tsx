import Link from "next/link"
import { Briefcase, Building2, Globe, HeartHandshake, Star, Users } from "lucide-react"

import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"

const values = [
  {
    icon: HeartHandshake,
    title: "People first",
    description:
      "Every match is guided by fairness and transparency, so both sides of the hire win.",
  },
  {
    icon: Globe,
    title: "Borderless by default",
    description:
      "Remote-first from day one — we connect talent to opportunity anywhere on earth.",
  },
  {
    icon: Star,
    title: "Quality over volume",
    description:
      "Curated listings and real company reviews keep the noise out of your job hunt.",
  },
]

const milestones = [
  { year: "2022", label: "HireLoop founded with a team of five" },
  { year: "2024", label: "Crossed 500K active job seekers" },
  { year: "2025", label: "Expanded to 40+ countries" },
  { year: "2026", label: "2M job seekers, 12K partner companies" },
]

function CompanyPage() {
  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <header className="pt-10 sm:pt-14">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            About HireLoop
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/60 sm:text-base">
            HireLoop is a hiring platform on a mission to make job searching
            human again. We loop the right people into the right roles —
            faster, fairer, and without the endless application black hole.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button render={<Link href="/jobs" />} nativeButton={false}>
              Browse Jobs
            </Button>
            <Button
              render={<Link href="/pricing" />}
              nativeButton={false}
              variant="outline"
            >
              See Pricing
            </Button>
          </div>
        </header>

        <section className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="flex flex-col rounded-xl border border-border/50 bg-card/40 p-5">
            <Briefcase className="size-4 text-foreground/80" />
            <div className="mt-auto pt-8 text-3xl font-medium tracking-tight">50K</div>
            <div className="mt-1 text-sm text-foreground/60">Active Jobs</div>
          </div>
          <div className="flex flex-col rounded-xl border border-border/50 bg-card/40 p-5">
            <Building2 className="size-4 text-foreground/80" />
            <div className="mt-auto pt-8 text-3xl font-medium tracking-tight">12K</div>
            <div className="mt-1 text-sm text-foreground/60">Companies</div>
          </div>
          <div className="flex flex-col rounded-xl border border-border/50 bg-card/40 p-5">
            <Users className="size-4 text-foreground/80" />
            <div className="mt-auto pt-8 text-3xl font-medium tracking-tight">2M</div>
            <div className="mt-1 text-sm text-foreground/60">Job Seekers</div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            What we stand for
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border/50 bg-card/40 p-5"
              >
                <value.icon className="size-4 text-foreground/80" />
                <h3 className="mt-3 font-medium">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Our journey
          </h2>
          <ol className="mt-5 flex flex-col gap-3">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                className="flex items-baseline gap-4 rounded-xl border border-border/50 bg-card/40 px-5 py-4"
              >
                <span className="font-mono text-sm text-foreground/50">
                  {milestone.year}
                </span>
                <span className="text-sm">{milestone.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12 rounded-xl border border-border/50 bg-card/40 p-6 text-center sm:p-10">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Ready to find your next role?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
            Join millions of job seekers already looping into better careers.
          </p>
          <Button
            render={<Link href="/sign-up" />}
            nativeButton={false}
            className="mt-5 px-5"
          >
            Get Started
          </Button>
        </section>
      </main>
    </>
  )
}

export default CompanyPage
