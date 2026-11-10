import Image from "next/image"
import Link from "next/link"

const columns = [
  {
    title: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    title: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    title: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
]

function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 320 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  )
}

function PaypalIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.079 6.361H2.984c-.288 0-.532.21-.577.495L.682 17.71c-.034.218.134.415.355.415h2.352c.288 0 .532-.21.577-.495l.538-3.409c.044-.284.288-.495.576-.495h1.653c3.442 0 5.432-1.665 5.95-4.965.234-1.446.01-2.583-.667-3.38-.744-.878-2.066-1.343-3.82-1.343zm.619 4.515c-.286 1.88-1.73 1.88-3.125 1.88h-.794l.557-3.518c.033-.212.216-.368.431-.368h.365c.951 0 1.85 0 2.315.542.277.324.361.804.251 1.464zm11.155-4.515h-2.097c-.216 0-.4.156-.433.368l-.092.582-.146-.211c-.452-.657-1.399-.876-2.345-.876-2.194 0-4.068 1.663-4.43 3.993-.189 1.166.071 2.28.739 3.057.605.706 1.471.999 2.503.999 1.76 0 2.737-1.13 2.737-1.13l-.094.577c-.036.22.135.419.355.419h1.89c.288 0 .531-.21.576-.494l1.135-7.187c.036-.22-.134-.417-.354-.417zm-2.528 4.515c-.191 1.133-1.093 1.897-2.242 1.897-.578 0-1.04-.186-1.336-.537-.293-.348-.404-.845-.311-1.397.178-1.123 1.094-1.913 2.226-1.913.566 0 1.025.188 1.327.542.303.358.423.863.336 1.408z" />
    </svg>
  )
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 148.3z" />
    </svg>
  )
}

const socials = [
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "PayPal", href: "#", icon: PaypalIcon, rounded: true },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
]

function SiteFooter() {
  return (
    <footer className="bg-[#020205] text-white">
      <div className="mx-auto max-w-6xl px-4 pt-[clamp(2.5rem,6vw,4.5rem)] pb-10 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Link
              href="/"
              aria-label="HireLoop home"
              className="inline-block w-fit"
            >
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                className="h-auto w-[112px]"
              />
            </Link>

            <p className="mt-4 max-w-[250px] text-sm leading-relaxed text-neutral-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[15px] font-medium text-[#8f8ffa]">
                  {column.title}
                </h3>

                <ul className="mt-5 flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                aria-label={social.label}
                href={social.href}
                className={
                  social.rounded
                    ? "flex size-8 items-center justify-center rounded-full bg-[#7774f0] transition-colors hover:bg-[#8a87f4]"
                    : "flex size-8 items-center justify-center rounded-lg bg-[#1a1a20] transition-colors hover:bg-[#26262e]"
                }
              >
                <social.icon className="size-3.5 text-white" />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center sm:gap-10">
            <p>Copyright 2024 —Programming Hero</p>

            <p>
              <a href="#" className="transition-colors hover:text-neutral-300">
                Terms &amp; Policy
              </a>
              <span className="mx-1.5">-</span>
              <a href="#" className="transition-colors hover:text-neutral-300">
                Privacy Guideline
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
