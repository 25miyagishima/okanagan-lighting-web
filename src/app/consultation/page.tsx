import type { ReactNode } from "react";
import { submitConsultation } from "./actions";

const navigation = [
  { href: "/", label: "HOME" },
  { href: "/#services", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "/consultation", label: "CONTACT" },
];

const nextSteps = [
  {
    number: "01",
    title: "SEND YOUR DETAILS",
    description:
      "Tell us about your project and provide any information that may help us understand the work.",
  },
  {
    number: "02",
    title: "WE'LL FOLLOW UP",
    description:
      "We'll review your request and contact you to discuss the project and answer any initial questions.",
  },
  {
    number: "03",
    title: "PLAN THE NEXT STEP",
    description:
      "We'll determine whether a site visit, consultation, estimate, or another next step is appropriate.",
  },
];

function Background({ opacity = "opacity-100" }: { opacity?: string }) {
  return (
    <div
      className={`absolute inset-0 ${opacity}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(184,132,78,.12),transparent_28%),linear-gradient(180deg,#141718_0%,#181B1C_48%,#1F2223_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(184,132,78,.07),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/28 via-black/8 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_47%,rgba(255,255,255,.025)_47.1%,transparent_47.7%)]" />
    </div>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
      {children}
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#111315]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-center px-6 md:px-12 lg:px-16">
        <nav
          className="flex flex-wrap items-center justify-center gap-5 md:gap-8"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-medium tracking-[0.16em] transition-colors duration-300 hover:text-[#B8844E] ${
                item.href === "/consultation"
                  ? "text-[#B8844E]"
                  : "text-white/65"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#181B1C] pb-20 pt-32 text-white md:pb-28 md:pt-40">
      <Background />

      <Container>
        <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
          CONTACT
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#F3EEE7] md:text-7xl">
          Tell us about your project.
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#C8C0B6]">
          Share a few details below and we&apos;ll follow up to discuss the next
          step.
        </p>
      </Container>
    </section>
  );
}

function FormField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-[#F3EEE7]"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

const fieldClassName =
  "w-full rounded-none border border-white/10 bg-[#202425] p-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#B8844E]";

function ConsultationForm() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/10 bg-[#181B1C] py-20 text-white md:py-28"
    >
      <Background opacity="opacity-30" />

      <Container>
        <form
          action={submitConsultation}
          className="grid max-w-3xl gap-5"
        >
          <FormField id="name" label="Name">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className={fieldClassName}
            />
          </FormField>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClassName}
              />
            </FormField>

            <FormField id="phone" label="Phone">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClassName}
              />
            </FormField>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField id="location" label="Project location">
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="street-address"
                className={fieldClassName}
              />
            </FormField>

            <FormField id="projectType" label="Project type">
              <select
                id="projectType"
                name="projectType"
                defaultValue=""
                className={fieldClassName}
              >
                <option value="" disabled>
                  Select a project type
                </option>
                <option value="residential-electrical">
                  Residential Electrical
                </option>
                <option value="commercial-electrical">
                  Commercial Electrical
                </option>
                <option value="lighting">
                  Lighting Design &amp; Installation
                </option>
                <option value="other">Other</option>
              </select>
            </FormField>
          </div>

          <FormField id="message" label="Project details">
            <textarea
              id="message"
              name="message"
              rows={7}
              required
              placeholder="Tell us what you're planning, what you need help with, and any other details that may be useful."
              className={`${fieldClassName} resize-y`}
            />
          </FormField>

          <div className="pt-3">
            <button
              type="submit"
              className="inline-flex min-h-14 items-center justify-center border border-[#B8844E] bg-[#B8844E] px-8 text-xs font-bold tracking-[0.16em] text-[#141718] transition duration-300 hover:bg-[#C8935D]"
            >
              REQUEST A CONSULTATION
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}

function NextStepsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#141718] py-20 text-white md:py-28">
      <Background opacity="opacity-40" />

      <Container>
        <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
          NEXT STEPS
        </p>

        <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#F3EEE7] md:text-5xl">
          What happens next.
        </h2>

        <div className="mt-14 grid border-y border-white/10 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <div
              key={step.number}
              className={`py-10 md:px-8 ${
                index
                  ? "border-t border-white/10 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[#B8844E]">
                {step.number}
              </p>

              <h3 className="mt-6 text-base font-semibold tracking-[0.12em] text-[#F3EEE7]">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-[#C8C0B6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-[#111315] px-6 py-10 text-white md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-[0.16em] text-white">
            GIANTS HEAD ELECTRICAL CONTRACTING LTD.
          </h2>

          <p className="mt-2 text-sm text-white/55">
            Summerland, British Columbia
          </p>

          <p className="mt-4 text-xs text-white/45">
            TSBC Licensed Electrical Contractor · LIC-00215594 
          </p>

          <p className="mt-4 text-xs text-white/35">
            © 2026 Giants Head Electrical Contracting Ltd.
          </p>
        </div>

        <a
          href="/operations"
          aria-label="Operations access"
          className="text-lg leading-none text-[#B8844E]/20 transition duration-300 hover:text-[#B8844E]"
        >
          •
        </a>
      </div>
    </footer>
  );
}

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#181B1C] text-white">
      <Nav />
      <HeroSection />
      <ConsultationForm />
      <NextStepsSection />
      <FooterSection />
    </main>
  );
}