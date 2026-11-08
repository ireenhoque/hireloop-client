"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Mail, ShieldCheck, User } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  // Send unauthenticated visitors to the sign-in page.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in")
    }
  }, [isPending, session, router])

  if (isPending || !session) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
        <span
          aria-hidden="true"
          className="h-105 w-full max-w-md animate-pulse rounded-3xl bg-card"
        />
      </main>
    )
  }

  const user = session.user
  const displayName = user.name || user.email.split("@")[0]
  const initials = user.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]!.toUpperCase())
        .join("")
    : user.email[0]!.toUpperCase()

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-4">
      {/* Subtle ambient glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/12 to-transparent"
      />

      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <Link href="/" className="font-heading text-xl font-semibold">
          HireLoop
        </Link>

        <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg shadow-black/5 dark:shadow-black/20">
          {/* Gradient cover */}
          <div
            aria-hidden="true"
            className="h-24 bg-gradient-to-r from-primary/15 via-primary/8 to-transparent"
          >
            <div className="ml-6 mt-3 h-1 w-12 rounded-full bg-primary/30" />
          </div>

          {/* Avatar overlapping the cover */}
          <div className="mx-auto -mt-10 flex w-fit flex-col items-center gap-1 px-6">
            <span
              aria-hidden="true"
              className="flex size-20 items-center justify-center rounded-full border-4 border-card bg-primary text-xl font-semibold text-primary-foreground shadow-md shadow-black/10"
            >
              {initials}
            </span>

            <h1 className="mt-2 truncate text-lg font-semibold text-foreground">
              {displayName}
            </h1>

            {user.role && (
              <Badge variant="secondary" className="gap-1 capitalize">
                <ShieldCheck aria-hidden="true" />
                {user.role}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 p-6">
            <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <User className="size-4" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "flex min-w-0 flex-col",
                  !user.name && "text-muted-foreground italic"
                )}
              >
                <span className="text-xs text-muted-foreground">Full name</span>
                <span className="truncate text-sm font-medium">
                  {user.name || "Not set yet"}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Mail className="size-4" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="truncate text-sm font-medium">{user.email}</span>
              </span>
            </div>
          </div>

          {/* Footer action */}
          <div className="border-t border-border/60 p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              nativeButton={false}
              render={<Link href="/" />}
            >
              <span className="text-muted-foreground text-sm">Back to jobs</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
