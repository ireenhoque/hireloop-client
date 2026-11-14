"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleButton } from "@/components/auth/google-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "cn"

const ROLES = ["seeker", "recruiter", "admin"] as const

export type Role = (typeof ROLES)[number]

const initialFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "seeker" as Role,
}

// Data passed to the parent's submit handler (confirm password is
// intentionally excluded — it is only a UI-level check).
export type AuthFormData = {
  name: string
  email: string
  password: string
  role: Role
}

export function SignUpForm({
  onSubmit,
}: {
  onSubmit?: (data: AuthFormData) => Promise<void> | void
}) {
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      console.error("Sign up failed: passwords do not match")
      return
    }

    if (!onSubmit) {
      console.log("Sign up data:", formData)
      return
    }

    // Map the form's `fullName` field to better-auth's `name` field.
    await onSubmit({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Join HireLoop to get started with your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Juan Dela Cruz"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="role-seeker" className="text-sm font-medium">
              I am a
            </label>
            <div
              role="radiogroup"
              aria-label="Account type"
              className="grid grid-cols-3 gap-1.5"
            >
              {ROLES.map((role) => (
                <Button
                  key={role}
                  type="button"
                  role="radio"
                  aria-checked={formData.role === role}
                  variant={formData.role === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData((prev) => ({ ...prev, role }))}
                >
                  <span className="capitalize">{role}</span>
                </Button>
              ))}
            </div>
            <p
              className={cn(
                "text-xs text-muted-foreground",
                formData.role === "admin" &&
                  "text-amber-600 dark:text-amber-400"
              )}
            >
              {formData.role === "seeker" &&
                "Find jobs and apply with your profile"}
              {formData.role === "recruiter" &&
                "Post jobs and manage candidates"}
              {formData.role === "admin" && "Manage the platform"}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Or
            <span className="h-px flex-1 bg-border" />
          </div>

          <GoogleButton callbackURL="/" />
        </form>
      </CardContent>
      <div className="px-(--card-spacing) pb-(--card-spacing) text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </Card>
  )
}
