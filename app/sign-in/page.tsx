"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function SignInPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const data = new FormData(event.currentTarget)
    const { error: signInError } = await signIn.email({
      email: String(data.get("email")),
      password: String(data.get("password")),
    })

    if (signInError) {
      setError(signInError.message ?? "Something went wrong. Try again.")
      setPending(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Sign In
        </h1>
        <p className="mt-1.5 text-sm text-foreground/60">
          Welcome back — pick up right where you left off.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                href="/sign-in"
                className="text-xs text-primary hover:underline"
                aria-disabled="true"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={pending} className={cn("w-full")}>
            {pending ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Get Started
          </Link>
        </p>
      </div>
    </main>
  )
}

export default SignInPage
