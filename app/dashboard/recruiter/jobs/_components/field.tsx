import type { ReactNode } from "react"

type FieldProps = {
  label: string
  htmlFor?: string
  note?: string
  children: ReactNode
}

export function Field({ label, htmlFor, note, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label} <span className="text-primary">*</span>
        </label>

        {note && <span className="text-xs text-muted-foreground">{note}</span>}
      </div>

      {children}
    </div>
  )
}
