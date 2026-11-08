import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

// Shared, reusable Mongo connection (connected via lib/mongodb.ts utilities).
import { mongoClient, mongoDb } from "@/lib/mongodb"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // Targets the intended `loopadmin` database through a single shared client.
  database: mongodbAdapter(mongoDb, {
    client: mongoClient,
  }),
})
