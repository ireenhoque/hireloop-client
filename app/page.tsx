import { HeroBanner } from "@/components/hero-banner"
import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <>
      <SiteNavbar />
      <main>
        <HeroBanner />
      </main>
    </>
  )
}
