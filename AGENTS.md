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
- `npx shadcn@latest add <name>` — adds components to `components/ui` (per `components.json`; README has this too).

Run `dev` or `build` once before `typecheck` on a fresh clone / after a Next upgrade: tsconfig includes generated `next-env.d.ts` and `.next/types/**` (both gitignored), which those commands produce.

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
