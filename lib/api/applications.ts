const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export type ApplicationPayload = {
  jobId: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  // Snapshot of the job at apply time; the server re-verifies these against
  // the stored job document.
  jobTitle: string
  companyName: string
}

export const applyToJob = async (data: ApplicationPayload) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(body?.message || "Failed to submit application")
  }

  return body
}
