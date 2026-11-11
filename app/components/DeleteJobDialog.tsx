"use client"

import { useState } from "react"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteJob } from "@/lib/actions/jobs"
import { Button } from "@/components/ui/button"
import type { JobPost } from "../dashboard/recruiter/jobs/manage-jobs-table"
import { toast } from "@/components/ui/toast"

export function DeleteJobDialog({
  job,
  onDeleted,
}: {
  job: JobPost
  onDeleted?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleDelete = async () => {
    setIsDeleting(true)
    setErrorMessage("")

    try {
      await deleteJob(job._id)

      onDeleted?.()
      setOpen(false)
    } catch (error) {
      console.error("Failed to delete job:", error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting this job."
      )
    } finally {
      setIsDeleting(false);
      toast.add({
        title: "Job deleted",
        description: "The job has been successfully deleted.",
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="icon-sm"
            aria-label={`Delete ${job.title}`}
          >
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-medium text-foreground">{job.title}</span> and
            remove it from the live listings. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
