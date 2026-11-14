import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { Panel } from "@/app/components/panel"

const CompanyPage = () => {
  return (
    <>
      <SiteNavbar />

      <main className="mx-auto w-full max-w-6xl px-3 py-16 sm:px-5">
        <Panel className="px-6 py-16 text-center">
          <h1 className="text-xl font-semibold">Company</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This page is coming soon.
          </p>
        </Panel>
      </main>

      <SiteFooter />
    </>
  )
}

export default CompanyPage
