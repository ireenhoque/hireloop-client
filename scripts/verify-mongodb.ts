// Standalone check for the MongoDB Atlas connection and the `loopadmin`
// database. Run with: npm run db:verify
// It creates the better-auth collections if missing (no dummy data) and
// prints database statistics only — never credentials.
import {
  ensureDatabaseReady,
  getMongoClient,
  MONGODB_DB_NAME,
} from "../lib/mongodb.ts"

try {
  const client = await getMongoClient()
  console.log(
    `Connected to MongoDB Atlas (appName: "${client.options.appName}")`
  )

  const result = await ensureDatabaseReady()

  const db = client.db(result.database)
  console.log(`Using database: "${result.database}"`)
  for (const collection of result.collections) {
    const count = await db.collection(collection).countDocuments()
    console.log(`  - ${collection} (${count} documents)`)
  }

  console.log(
    `\nSuccess — "${MONGODB_DB_NAME}" should now appear in Atlas Data Explorer under Browse Collections.`
  )
  process.exit(0)
} catch (error) {
  console.error("\nVerification failed:", error)
  console.error(
    "Troubleshooting: check MONGODB_URL in .env, and confirm your current IP is in the Atlas Project > Network Access allow list."
  )
  process.exit(1)
}
