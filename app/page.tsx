import { HeroBanner } from "@/components/hero-banner"
import { SiteNavbar } from "@/components/site-navbar"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteNavbar />
      <main>
        <HeroBanner />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
