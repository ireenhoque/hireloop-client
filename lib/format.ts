import type { JobFormData } from "@/lib/types/jobs"

export function formatSalary(value: string) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return value

  return amount >= 1000 ? `€${Math.round(amount / 1000)}k` : `€${amount}`
}

export function formatCompensation(job: JobFormData) {
  const frequency = job.salaryFrequency.replace("per ", "/ ")

  return `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)} ${frequency}`
}

export function formatLocation(job: JobFormData) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}
