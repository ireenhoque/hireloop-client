<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Next.js 16.4.4 (pinned exact) + React 19, App Router only (`app/`, no `pages/`). ESM (`"type": "module"`). No tests, no CI — `lint`, `typecheck`, and `build` are the verification steps.

## Commands

- `npm run dev` — Turbopack is the default bundler in Next.js 16; don't add a bundler flag.
- `npm run lint` — runs bare `eslint` (flat config in `eslint.config.mjs`; ignores are overridden there).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run format` — Prettier on `**/*.{ts,tsx}` only (other file types aren't covered).
- `npm run db:verify` — standalone Node script (`node --env-file=.env scripts/verify-mongodb.ts`, TS imports run natively) that connects to MongoDB Atlas, creates the better-auth collections/indexes if missing, and prints collection stats. Never inserts, drops, or overwrites data.
- `npx shadcn@latest add <name>` — adds components to `components/ui` (per `components.json`; README has this too).

Run `dev` or `build` once before `typecheck` on a fresh clone / after a Next upgrade: tsconfig includes generated `next-env.d.ts` and `.next/types/**` (both gitignored), which those commands produce.

## Env

- `.env` exists but is untracked; there is no `.env.example`. Required: `MONGODB_URL` — `lib/mongodb.ts` throws at import time without it, so the server won't start at all. Also used: `MONGODB_DB_NAME` (defaults to `loopadmin`), `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (Google social login), `NEXT_PUBLIC_BASE_URL` (see "Jobs data" below).
- `db:verify` failure usually means Atlas Network Access doesn't include your current IP — that allow list is per-machine, not in the repo.

## Auth & MongoDB (better-auth)

- Auth is better-auth: server config in `lib/auth.ts`, mounted at `app/api/auth/[...all]/route.ts` via `toNextJsHandler`; client in `lib/auth-client.ts` (exports `signIn`, `signUp`, `signOut`, `useSession`). Email/password plus Google social provider.
- Roles are `seeker | recruiter | admin` (`ROLES` in `lib/auth.ts`), stored as a better-auth `user.additionalFields.role`, accepted from the client at sign-up and validated by a `before` hook — client forms must send `name` (not `fullName`) plus `role` to `signUp`.
- One shared Mongo client in `lib/mongodb.ts`, cached on `globalThis` so dev HMR doesn't create duplicate connections; it targets the `loopadmin` DB explicitly (never the driver's implicit `test` DB). Its `ensureDatabaseReady()` creates the better-auth collections/indexes (idempotent, no data); it also fires-and-forgets from the auth route handler on first request.
- Auth data lives in Mongo; job postings do NOT (see below).

## Jobs data: external backend, not this app

- Jobs and applications come from a separate backend API at `NEXT_PUBLIC_BASE_URL` (default `http://localhost:5000`) — it must be running for job pages to work; Mongo is only for auth.
- `lib/api/*.ts` are read helpers (`getJobs`, `getJobById`, ...), `lib/actions/*.ts` are write helpers (`createJob`, `deleteJob`). Despite the folder name, these are plain `fetch` functions, not Next.js server actions — don't add a `"use server"` directive there.

## Toolchain quirks

- shadcn components use the `base-nova` style on **Base UI** (`@base-ui/react/*`), NOT Radix. Don't substitute Radix imports or props (e.g. Radix prop names differ from Base UI). Icons are `lucide-react`.
- Tailwind v4: no `tailwind.config.*`. Theme tokens are CSS variables mapped under `@theme inline` in `app/globals.css`, which also imports `shadcn/tailwind.css` (the `shadcn` npm package supplies base styles) and `tw-animate-css`. The `shadcn` package is a real dependency because of this import.
- `cn` is provided by the `cn` npm package; `@/lib/utils` just re-exports it. Keep using it — the Tailwind prettier plugin sorts classes inside `cn` and `cva` calls, so don't hand-order long class strings or use other `clsx`/`twMerge` calls.
- Prettier: no semicolons, double quotes, LF line endings (source files are committed with LF even though the OS is Windows).
- Path alias `@/*` maps to the repo root (tsconfig), matching the shadcn aliases in `components.json`.
- Dark mode is class-based (`@custom-variant dark` + `ThemeProvider` from `next-themes` in `app/layout.tsx`, which has `suppressHydrationWarning` for that reason).

## Version pairing

- `next` and `eslint-config-next` are pinned to the same exact version (16.4.4) — bump them together.
- `CLAUDE.md` contains only `@AGENTS.md` and points at this file; don't split guidance between them.
