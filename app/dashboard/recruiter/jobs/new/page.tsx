"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { ArrowRight, Calendar, Euro, Globe, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"


const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]
export type JobStatus = "Active" | "Expired"

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Finance & Accounting",
  "Customer Support",
  "Data & Analytics",
  "Other",
]

const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

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

function SectionHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
      <h2 className="text-lg font-semibold">
        {step}. {title}
      </h2>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  note,
  children,
}: {
  label: string
  htmlFor?: string
  note?: string
  children: React.ReactNode
}) {
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

export default function NewJobsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<JobFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (
    name: keyof JobFormData,
    value: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value ?? "" }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isRemote: checked }))
  }

  const handleJobTypeChange = (jobType: string) => {
    setFormData((prev) => ({ ...prev, jobType }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      formData.minSalary &&
      formData.maxSalary &&
      Number(formData.minSalary) > Number(formData.maxSalary)
    ) {
      setErrorMessage("Min salary cannot be greater than max salary.")
      return
    }

    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const result = await createJob(formData);
      if (result.insertedId) {
        console.log("Job creation result:", result)
        toast.add({
          title: "Job Created",
          description: "The job has been successfully created.",
        })
        router.push("/dashboard/recruiter/jobs")
      }

      setSuccessMessage("Job posted successfully!")

      setFormData(initialFormData)
    } catch (error) {
      console.error("Failed to create job:", error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while posting the job."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl px-6 py-8">
      {/* Header */}
      <p className="text-sm text-muted-foreground">
        Manage Jobs <span className="mx-1.5">›</span>{" "}
        <span className="text-primary">Create New Listing</span>
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
      </div>

      {successMessage && (
        <p className="mt-4 text-sm text-primary" role="status">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}

      {/* Form card */}
      <div className="mt-6 flex flex-col divide-y divide-border overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
        {/* 1. Basic Information */}
        <section className="space-y-5 p-6">
          <SectionHeader step={1} title="Basic Information" />

          <Field label="Job Title" htmlFor="title">
            <Input
              id="title"
              name="title"
              placeholder="Frontend Developer"
              required
              value={formData.title}
              onChange={handleInputChange}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Company Name" htmlFor="companyName">
              <Input
                id="companyName"
                name="companyName"
                placeholder="HirePulse Network"
                required
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </Field>

            <Field label="Job Category" htmlFor="category">
              <Select
                value={formData.category || null}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Job Type">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleJobTypeChange(type)}
                  className={
                    formData.jobType === type
                      ? "rounded-lg border border-primary bg-primary/10 px-3 py-2.5 text-sm text-primary"
                      : "rounded-lg border border-border bg-input/30 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {type}
                </button>
              ))}
            </div>
          </Field>
        </section>

        {/* 2. Location, Compensation & Timeline */}
        <section className="space-y-5 p-6">
          <SectionHeader step={2} title="Location, Compensation & Timeline" />

          <div className="flex items-center gap-3 rounded-xl border border-border bg-input/20 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Globe className="size-4" />
            </span>

            <div className="min-w-0">
              <p className="font-medium">
                Remote Work Allowed{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  (isRemote)
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Enable worldwide or distributed candidate applications
              </p>
            </div>

            <Switch
              checked={formData.isRemote}
              onCheckedChange={handleSwitchChange}
              className="ml-auto"
              aria-label="Remote work allowed"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Job Location" htmlFor="location" note="Required">
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  placeholder="New York, USA"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="pl-8"
                />
              </div>
            </Field>

            <Field label="Application Deadline (deadline)" htmlFor="deadline">
              <div className="relative">
                <Calendar className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="pl-8"
                />
              </div>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Min Salary / rate" htmlFor="minSalary">
              <div className="relative">
                <Euro className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min="0"
                  placeholder="25"
                  required
                  value={formData.minSalary}
                  onChange={handleInputChange}
                  className="pl-8"
                />
              </div>
            </Field>

            <Field label="Max Salary / rate" htmlFor="maxSalary">
              <div className="relative">
                <Euro className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min="0"
                  placeholder="40"
                  required
                  value={formData.maxSalary}
                  onChange={handleInputChange}
                  className="pl-8"
                />
              </div>
            </Field>

            <Field label="Frequency" htmlFor="salaryFrequency">
              <Select
                value={formData.salaryFrequency}
                onValueChange={(value) =>
                  handleSelectChange("salaryFrequency", value)
                }
              >
                <SelectTrigger id="salaryFrequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </section>

        {/* 3. Responsibilities & Requirements */}
        <section className="space-y-5 p-6">
          <SectionHeader step={3} title="Responsibilities & Requirements" />

          <Field label="Key Responsibilities" htmlFor="responsibilities">
            <Textarea
              id="responsibilities"
              name="responsibilities"
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              required
              value={formData.responsibilities}
              onChange={handleInputChange}
            />
          </Field>

          <Field label="Qualifications & Requirements" htmlFor="qualifications">
            <Textarea
              id="qualifications"
              name="qualifications"
              placeholder={
                "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
              }
              required
              value={formData.qualifications}
              onChange={handleInputChange}
              className="min-h-24"
            />
          </Field>
        </section>
        <section className="flex justify-end p-6">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish Job"}
            <ArrowRight />
          </Button>
        </section>
      </div>
    </form>
  )
}
