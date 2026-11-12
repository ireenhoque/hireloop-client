import {
  Briefcase,
  ChartColumn,
  Code,
  Headset,
  Layers,
  Megaphone,
  Palette,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export const CATEGORY_STYLES: Record<
  string,
  { icon: LucideIcon; tile: string; label: string }
> = {
  "Engineering & Tech": {
    icon: Code,
    tile: "bg-sky-500/15 text-sky-400",
    label: "text-sky-400",
  },
  "Design & Creative": {
    icon: Palette,
    tile: "bg-orange-500/15 text-orange-400",
    label: "text-orange-400",
  },
  "Product & Management": {
    icon: Layers,
    tile: "bg-indigo-500/15 text-indigo-400",
    label: "text-indigo-400",
  },
  "Marketing & Sales": {
    icon: Megaphone,
    tile: "bg-pink-500/15 text-pink-400",
    label: "text-pink-400",
  },
  "Finance & Accounting": {
    icon: Wallet,
    tile: "bg-emerald-500/15 text-emerald-400",
    label: "text-emerald-400",
  },
  "Customer Support": {
    icon: Headset,
    tile: "bg-amber-500/15 text-amber-400",
    label: "text-amber-400",
  },
  "Data & Analytics": {
    icon: ChartColumn,
    tile: "bg-cyan-500/15 text-cyan-400",
    label: "text-cyan-400",
  },
  Other: {
    icon: Briefcase,
    tile: "bg-muted text-muted-foreground",
    label: "text-muted-foreground",
  },
}

export const FALLBACK_CATEGORY_STYLE = {
  icon: Briefcase,
  tile: "bg-muted text-muted-foreground",
  label: "text-muted-foreground",
}
