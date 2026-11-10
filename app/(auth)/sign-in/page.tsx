import Link from "next/link"
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <Link href="/" className="font-heading text-xl font-semibold">
          HireLoop
        </Link>

        <SignInForm />
      </div>
    </main>
  )
}
