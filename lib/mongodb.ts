import {
  MongoClient,
  type CreateIndexesOptions,
  type IndexSpecification,
  type Db,
} from "mongodb"

if (!process.env.MONGODB_URL) {
  throw new Error(
    "MONGODB_URL is not set. Add it to the .env file at the project root."
  )
}

const uri = process.env.MONGODB_URL

/**
 * Intended database name. Defaults to "loopadmin"; can be overridden with
 * MONGODB_DB_NAME. Always selected explicitly so the app never falls back to
 * the driver's implicit "test" database.
 */
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME ?? "loopadmin"

declare global {
  // Cached connection promise survives Next.js dev hot reloads so we never
  // create duplicate MongoClients per module evaluation.
  var __hireloopMongoClientPromise: Promise<MongoClient> | undefined
}

const client = new MongoClient(uri, {
  appName: "hireloop-client",
  // Fail fast AND with a clear error if Atlas is unreachable
  // (e.g. IP allow list / network issues) instead of hanging.
  serverSelectionTimeoutMS: 10_000,
})

/** The client instance handed to the better-auth Mongo adapter. */
export const mongoClient = client

/** The `loopadmin` database handle. */
export const mongoDb: Db = client.db(MONGODB_DB_NAME)

/**
 * Connects once and reuses the same promise afterwards. If connecting fails,
 * the cached promise is cleared so a later call can retry instead of
 * permanently caching the failure.
 */
export function getMongoClient(): Promise<MongoClient> {
  global.__hireloopMongoClientPromise ??= client.connect().catch((error) => {
    global.__hireloopMongoClientPromise = undefined
    console.error("[mongodb] failed to connect to MongoDB Atlas:", error)
    throw error
  })

  return global.__hireloopMongoClientPromise
}

/** Connects (if needed) and returns the configured `loopadmin` database. */
export async function getMongoDb(): Promise<Db> {
  const connected = await getMongoClient()
  return connected.db(MONGODB_DB_NAME)
}

const AUTH_COLLECTIONS = ["user", "session", "account", "verification"]

// Indexes matching better-auth's generated MongoDB schema. createIndex is
// idempotent for identical specs, so re-running this is safe.
const AUTH_INDEXES: Array<{
  collection: string
  keys: IndexSpecification
  options: CreateIndexesOptions
}> = [
  { collection: "user", keys: { email: 1 }, options: { unique: true } },
  { collection: "session", keys: { token: 1 }, options: { unique: true } },
  { collection: "session", keys: { userId: 1 }, options: {} },
  { collection: "account", keys: { userId: 1 }, options: {} },
  { collection: "verification", keys: { identifier: 1 }, options: {} },
]

export type DatabaseReadiness = {
  database: string
  created: string[]
  collections: string[]
}

/**
 * Materializes the `loopadmin` database by creating the better-auth
 * collections (and their indexes) if they do not exist yet.
 * No documents are inserted and nothing is ever dropped or overwritten.
 */
export async function ensureDatabaseReady(): Promise<DatabaseReadiness> {
  const db = await getMongoDb()

  const names = new Set(
    (await db.listCollections().toArray()).map((collection) => collection.name)
  )

  const created: string[] = []
  for (const name of AUTH_COLLECTIONS) {
    if (names.has(name)) continue
    await db.createCollection(name)
    created.push(name)
  }

  for (const { collection, keys, options } of AUTH_INDEXES) {
    await db.collection(collection).createIndex(keys, options)
  }

  if (created.length > 0) {
    console.info(
      `[mongodb] database "${MONGODB_DB_NAME}" ready, created collections: ${created.join(", ")}`
    )
  }

  return {
    database: MONGODB_DB_NAME,
    created,
    collections: [...names].concat(created).sort(),
  }
}
