'use client'

import Link from "next/link"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"
import type { AuthFormData } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  const handleSignUp = async (data: AuthFormData) => {
    const { data: signUpResponse, error } =
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        callbackURL: "/",
      })

    console.log("signup response", signUpResponse, error)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Link href="/" className="font-heading text-xl font-semibold">
          HireLoop
        </Link>

        <SignUpForm onSubmit={handleSignUp} />
      </div>
    </main>
  )
}
