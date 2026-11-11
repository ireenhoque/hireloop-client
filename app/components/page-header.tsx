import type { ReactNode } from "react"

type PageHeaderProps = {
  breadcrumb: string
  current: string
  title: string
  description: string
  action?: ReactNode
}

export function PageHeader({
  breadcrumb,
  current,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        {breadcrumb} <span className="mx-1.5">›</span>{" "}
        <span className="text-primary">{current}</span>
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        {action}
      </div>
    </>
  )
}
