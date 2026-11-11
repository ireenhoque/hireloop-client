export type JobStatus = "Active" | "Expired"

export type JobFormData = {
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  qualifications: string
  applicants?: number
  status?: JobStatus
}

export type JobPost = JobFormData & {
  _id: string
  postedAgo?: string
}
