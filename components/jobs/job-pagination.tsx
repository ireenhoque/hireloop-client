"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type JobPaginationProps = {
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  className?: string
}

export function JobPagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  className,
}: JobPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav
      aria-label="Job pagination"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <Button
        variant="outline"
        size="icon-sm"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange?.(page - 1)}
      >
        <ChevronLeft />
      </Button>

      {pages.map((number) => (
        <Button
          key={number}
          variant={number === page ? "default" : "outline"}
          size="icon-sm"
          aria-current={number === page ? "page" : undefined}
          onClick={() => onPageChange?.(number)}
        >
          {number}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon-sm"
        disabled={page >= totalPages}
        aria-label="Next page"
        onClick={() => onPageChange?.(page + 1)}
      >
        <ChevronRight />
      </Button>
    </nav>
  )
}
