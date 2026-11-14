import { JobPost } from "../types/jobs"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = "") => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

export const getJobById = async (jobId: string): Promise<JobPost | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`)
  if (!res.ok) {
    return null
  }
  return res.json()
}
