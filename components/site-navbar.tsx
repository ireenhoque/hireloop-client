"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

const links = [
  { href: "#", label: "Browse Jobs" },
  { href: "#", label: "Company" },
  { href: "#", label: "Pricing" },
]

function SiteNavbar() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const {
    data: session,
    isPending: isSessionPending,
    refetch: refetchSession,
  } = authClient.useSession()

  const [isSigningOut, setIsSigningOut] = React.useState(false)
  const [signOutError, setSignOutError] = React.useState("")

  const handleSignOut = async () => {
    setIsSigningOut(true)
    setSignOutError("")

    try {
      const { error } = await authClient.signOut()

      if (error) {
        setSignOutError(error.message || "Failed to sign out. Please try again.")
        return
      }

      // Refresh the client-side session store and send the user to sign-in.
      await refetchSession()
      setOpen(false)
      router.push("/sign-in")
    } catch (error) {
      console.error("Sign out error:", error)
      setSignOutError("Something went wrong. Please try again.")
    } finally {
      setIsSigningOut(false)
    }
  }

  const user = session?.user
  const isSignedIn = !isSessionPending && Boolean(user)
  const closeMenu = () => setOpen(false)

  return (
    <header className="px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-xl border border-border/40 bg-card/50 py-3 pr-3 pl-4 sm:pr-3.5 sm:pl-5">
        <Link href="/" aria-label="HireLoop home" className="shrink-0" onClick={closeMenu}>
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

            {isSessionPending ? (
              // Placeholder while the session resolves, so the auth area
              // doesn't flicker between signed-in/signed-out states.
              <span
                aria-hidden="true"
                className="h-5 w-20 animate-pulse rounded-md bg-muted/70"
              />
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  className="max-w-[16ch] truncate text-primary transition-opacity hover:opacity-80"
                >
                  {user.name || user.email}
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="text-primary transition-opacity hover:opacity-80"
              >
                Sign In
              </Link>
            )}
          </nav>

          {!isSignedIn && (
            <Button
              size="sm"
              className="px-4"
              nativeButton={false}
              render={<Link href="/sign-up" />}
            >
              Get Started
            </Button>
          )}

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

      {signOutError && (
        <p
          role="alert"
          className="mx-auto mt-2 max-w-6xl text-center text-xs text-destructive"
        >
          {signOutError}
        </p>
      )}

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-xl border border-border/40 bg-card p-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-2 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-3 border-t border-border/60 pt-4">
            {isSessionPending ? (
              <span
                aria-hidden="true"
                className="h-8 w-full animate-pulse rounded-md bg-muted/60"
              />
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="max-w-full truncate px-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                >
                  {user.name || user.email}
                </Link>

                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className="px-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                >
                  Sign In
                </Link>

                <Button
                  className="w-full"
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export { SiteNavbar }
