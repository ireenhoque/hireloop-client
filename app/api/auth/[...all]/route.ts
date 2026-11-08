import { auth } from "@/lib/auth" // path to your auth file
import { toNextJsHandler } from "better-auth/next-js"
import { ensureDatabaseReady } from "@/lib/mongodb"

// Materialize the `loopadmin` database (creates the better-auth collections
// when missing) so it is visible in Atlas Data Explorer before the first
// signup. Failures are logged but never block auth requests.
void ensureDatabaseReady().catch((error) => {
  console.error("[mongodb] database initialization failed:", error)
})

export const { POST, GET } = toNextJsHandler(auth)
