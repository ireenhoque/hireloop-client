import Image from "next/image"
import { Briefcase, Building2, Monitor, Star, Users } from "lucide-react"

import { SearchBar } from "@/components/search-bar"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { icon: Monitor, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
] as const

function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative globe behind the lower part of the section. The PNG has a
          magenta top edge that has to be faded into the page background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="relative mx-auto h-full max-w-[1440px]">
          <Image
            src="/images/globe.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 top-0 h-[44vw] max-h-[600px] bg-gradient-to-b from-background from-[82%] to-transparent" />
        </div>
      </div>

      <div className="relative z-10 px-4 pt-12 text-center sm:pt-16 md:px-6">
        <div className="flex items-center justify-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-r from-transparent to-border/70 md:w-16"
          />
          <span className="flex items-center gap-2 rounded-full border border-border/60 bg-card/50 py-1.5 pr-3 pl-2.5 backdrop-blur-[2px]">
            <Briefcase className="size-3.5 text-foreground/70" />
            <span className="text-xs font-semibold">50,000+</span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-foreground/50 uppercase">
              New jobs this month
            </span>
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-gradient-to-l from-transparent to-border/70 md:w-16"
          />
        </div>

        <h1 className="mx-auto mt-6 max-w-2xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60 sm:max-w-lg sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <SearchBar />

        <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <span className="text-sm text-foreground/50">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingPositions.map((position) => (
              <button
                key={position}
                type="button"
                className="rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {position}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 pb-10 sm:mt-24 md:pb-14">
        <p className="mx-auto max-w-sm px-4 text-center text-lg leading-snug text-foreground/70 sm:pt-6 md:max-w-md md:text-2xl">
          Assisting over{" "}
          <span className="font-medium text-foreground">
            15,000 job seekers
          </span>{" "}
          find their dream positions.
        </p>

        <div className="mx-auto mt-8 grid w-full max-w-[1360px] grid-cols-2 gap-3 px-3 sm:gap-4 md:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-xl border border-border/50 bg-card/40 p-4 backdrop-blur-[2px] sm:p-5"
            >
              <stat.icon
                className="size-4 text-foreground/80"
                aria-hidden="true"
              />
              <div className="mt-auto pt-8 sm:pt-12">
                <div className="text-3xl font-medium tracking-tight sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-foreground/60 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HeroBanner }
