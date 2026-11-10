import { betterAuth } from "better-auth"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

// Shared, reusable Mongo connection (connected via lib/mongodb.ts utilities).
import { mongoClient, mongoDb } from "@/lib/mongodb"

export const ROLES = ["seeker", "recruiter", "admin"] as const

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const role = ctx.body?.role

      if (
        role !== undefined &&
        !ROLES.includes(role as (typeof ROLES)[number])
      ) {
        throw new APIError("BAD_REQUEST", {
          message: "Invalid role",
        })
      }
    }),
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        // Allow the sign-up endpoint to accept `role` from the client
        // (validated by the `before` hook above).
        input: true,
        defaultValue: "seeker",
      },
    },
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
