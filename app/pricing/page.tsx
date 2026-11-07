import Link from "next/link"
import { Check } from "lucide-react"

import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"

type Plan = {
  name: string
  price: string
  period: string
  description: string
  cta: { label: string; href: string }
  features: string[]
  highlight?: boolean
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For job seekers starting their search.",
    cta: { label: "Get Started", href: "/sign-up" },
    features: [
      "Unlimited job applications",
      "Basic profile & resume upload",
      "Saved searches and alerts",
      "Company reviews",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "For serious seekers who want an edge.",
    cta: { label: "Go Pro", href: "/sign-up" },
    highlight: true,
    features: [
      "Everything in Free",
      "Priority visibility to recruiters",
      "AI resume review & match score",
      "Salary insights per role",
      "Interview prep toolkit",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual billing",
    description: "For teams hiring at scale.",
    cta: { label: "Contact Sales", href: "/company" },
    features: [
      "Everything in Pro",
      "Unlimited job posts & seats",
      "Applicant tracking pipeline",
      "Employer branding pages",
      "Dedicated success manager",
    ],
  },
]

function PricingPage() {
  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <header className="pt-10 text-center sm:pt-14">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-foreground/60 sm:text-base">
            Start free and upgrade when you are ready. No hidden fees, cancel
            anytime.
          </p>
        </header>

        <div className="mt-10 grid gap-4 lg:grid-cols-3 sm:gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border bg-card/40 p-5 sm:p-6 ${
                plan.highlight
                  ? "border-primary/60 ring-2 ring-primary/20"
                  : "border-border/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold">{plan.name}</h2>
                {plan.highlight && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-foreground/60">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-3xl font-medium tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs text-foreground/50">{plan.period}</span>
              </div>
              <ul className="mt-5 flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                render={<Link href={plan.cta.href} />}
                nativeButton={false}
                variant={plan.highlight ? "default" : "outline"}
                className="mt-6 w-full"
              >
                {plan.cta.label}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default PricingPage
