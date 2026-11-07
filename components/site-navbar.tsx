"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

const links = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

function SiteNavbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-xl border border-border/40 bg-card/50 py-3 pr-3 pl-4 sm:pr-3.5 sm:pl-5">
        <Link href="/" aria-label="HireLoop home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <nav
            aria-label="Main"
            className="hidden items-center gap-6 text-sm md:flex"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <span aria-hidden="true" className="h-4 w-px bg-border/70" />
            <Link
              href="/sign-in"
              className="text-primary transition-opacity hover:opacity-80"
            >
              Sign In
            </Link>
          </nav>

          <Button
            size="sm"
            className="px-4"
            nativeButton={false}
            render={<Link href="/sign-up" />}
          >
            Get Started
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-xl border border-border/40 bg-card p-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-3 border-t border-border/60 pt-4">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="px-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              Sign In
            </Link>
            <Button
              nativeButton={false}
              render={<Link href="/sign-up" onClick={() => setOpen(false)} />}
              className="w-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export { SiteNavbar }
