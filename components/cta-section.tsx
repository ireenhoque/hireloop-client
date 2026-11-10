import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#020205] text-white">
      {/* Dome artwork: purple glow underneath, wireframe overlay on top. The
          PNG's lower half is a translucent black fade that vignettes the glow
          back into the black page. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[min(58vw,560px)] w-[min(86vw,1180px)] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_38%,rgba(97,96,255,0.72)_0%,rgba(76,74,224,0.38)_52%,rgba(47,46,150,0.12)_74%,transparent_100%)]" />
        <Image
          src="/images/cta-bg.png"
          alt=""
          width={1440}
          height={966}
          priority
          sizes="(max-width: 1680px) 100vw, 1680px"
          className="absolute top-0 left-1/2 h-auto w-full max-w-[1680px] -translate-x-1/2"
        />
      </div>

      <div className="relative z-10 px-4 pt-[clamp(7rem,20vw,13.5rem)] pb-[clamp(7rem,17vw,12rem)] text-center">
        <h2 className="mx-auto font-heading text-[2.1rem] leading-[1.12] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/70 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/sign-up" />}
            className="h-10 rounded-lg bg-white px-6 text-[15px] font-medium text-neutral-950 hover:bg-neutral-200"
          >
            Create a free account
          </Button>

          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="#" />}
            className="h-10 rounded-lg border border-white/10 bg-white/[0.06] px-6 text-[15px] font-medium text-white hover:bg-white/[0.12]"
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  )
}

export { CtaSection }
