import type { JobFormData } from "@/lib/types/jobs"

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Finance & Accounting",
  "Customer Support",
  "Data & Analytics",
  "Other",
]

export const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

export const initialFormData: JobFormData = {
  title: "",
  companyName: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  salaryFrequency: "per hour",
  responsibilities: "",
  qualifications: "",
  applicants: 0,
  status: "Active",
}
