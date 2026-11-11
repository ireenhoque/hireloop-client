export function SectionHeader({
  step,
  title,
}: {
  step: number
  title: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
      <h2 className="text-lg font-semibold">
        {step}. {title}
      </h2>
    </div>
  )
}
