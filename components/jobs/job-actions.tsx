"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Bookmark, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { applyToJob } from "@/lib/api/applications"
import { authClient } from "@/lib/auth-client"

type JobActionsProps = {
  jobId: string
  jobTitle: string
  companyName: string
}

export function JobActions({ jobId, jobTitle, companyName }: JobActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const user = session?.user

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [applyError, setApplyError] = useState("")

  // Only signed-in job seekers may apply; signed-out visitors are sent to
  // sign-in first. Recruiters and admins see a disabled button instead.
  const isSeeker = user?.role === "seeker"
  const canApply = !user || isSeeker

  const handleApply = async () => {
    setApplyError("")

    // Not signed in → go to sign-in, then come back to this same job page.
    if (!user) {
      router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // Server also enforces this; the client check just avoids a wasted request.
    if (!isSeeker) {
      setApplyError("Only job seekers can apply for jobs.")
      return
    }

    setIsApplying(true)

    try {
      await applyToJob({
        jobId,
        applicantId: user.id,
        applicantName: user.name || "",
        applicantEmail: user.email,
        jobTitle,
        companyName,
      })

      setHasApplied(true)
    } catch (error) {
      setApplyError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsBookmarked((value) => !value)}
          className={isBookmarked ? "text-primary" : "text-muted-foreground"}
          aria-label={
            isBookmarked
              ? `Remove bookmark from ${jobTitle}`
              : `Bookmark ${jobTitle}`
          }
          aria-pressed={isBookmarked}
        >
          {isBookmarked ? <Check /> : <Bookmark />}
        </Button>

        <Button
          onClick={handleApply}
          disabled={isSessionPending || isApplying || hasApplied || !canApply}
        >
          {hasApplied ? "Applied" : isApplying ? "Applying..." : "Apply Now"}
        </Button>
      </div>

      {!canApply && !hasApplied && (
        <p className="text-right text-xs text-muted-foreground">
          Only job seekers can apply for jobs.
        </p>
      )}

      {applyError && (
        <p className="text-right text-xs text-destructive" role="alert">
          {applyError}
        </p>
      )}
    </div>
  )
}
