import type { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const createJob = async (data: JobFormData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Failed to create job (status ${res.status})`)
  }

  return res.json()
}

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Failed to delete job (status ${res.status})`)
  }

  // The API may respond with an empty body on delete
  const raw = await res.text()

  return raw ? JSON.parse(raw) : null
}
