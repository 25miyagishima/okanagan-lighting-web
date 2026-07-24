import type { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  { href: "/", label: "HOME" },
  { href: "/#services", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "/consultation", label: "CONTACT" },
];

const services = [
  {
    title: "RESIDENTIAL ELECTRICAL",
    description:
      "Professional electrical services for homes, renovations, and new construction.",
  },
  {
    title: "COMMERCIAL ELECTRICAL",
    description:
      "Professional electrical services for businesses, commercial spaces, and tenant improvements.",
  },
  {
    title: "LIGHTING DESIGN & INSTALLATION",
    description:
      "Professional lighting services for residential and commercial properties.",
  },
];

const steps = [
  {
    number: "01",
    title: "CONSULTATION",
    description:
      "Every project begins with a conversation to understand your needs, answer questions, and discuss the best path forward.",
  },
  {
    number: "02",
    title: "PLANNING",
    description:
      "We develop a clear scope of work and provide a detailed quote before work begins.",
  },
  {
    number: "03",
    title: "INSTALLATION",
    description:
      "Professional installation completed with attention to detail.",
  },
];

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

function Background() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(184,132,78,.12),transparent_28%),linear-gradient(180deg,#141718_0%,#181B1C_52%,#1F2223_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(184,132,78,.07),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_47%,rgba(255,255,255,.025)_47.1%,transparent_47.7%)]" />
    </div>
  );
}

function ConsultationButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/consultation"
      className={`inline-flex items-center justify-center border border-[#9E744B] bg-[#9E744B] font-semibold tracking-[0.14em] text-[#F6F0E8] transition-colors duration-300 hover:border-[#B8844E] hover:bg-[#B8844E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8844E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#181B1C] ${
        compact
          ? "min-h-10 px-4 text-[10px] md:px-5 md:text-[11px]"
          : "min-h-12 px-6 text-xs"
      }`}
    >
      REQUEST A CONSULTATION
    </a>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#111315]/95 backdrop-blur-xl">
      <Container className="flex h-[64px] items-center justify-center">
        <nav
          className="flex flex-wrap items-center justify-center gap-5 md:gap-8"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.16em] text-white/65 transition-colors hover:text-[#B8844E]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-[#181B1C] pt-16 text-white"
    >
      <Background />

      <Container className="relative z-10 py-24 md:py-32 lg:py-36">
        <div className="max-w-6xl">
          <h1 className="max-w-6xl text-[clamp(3rem,7.2vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#F3EEE7]">
            Giants Head Electrical Contracting Ltd.
          </h1>

          <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-[#B8844E] md:text-sm">
            RESIDENTIAL <span className="px-2 text-white/25">•</span> COMMERCIAL
          </p>

          <div className="mt-8 space-y-1 text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
            <p>Rooted in Summerland</p>
            <p>Serving the Okanagan</p>
          </div>

          <div className="mt-10">
            <ConsultationButton />
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#F3EEE7] md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-[#181B1C] py-24 text-white md:py-32"
    >
      <Background />

      <Container className="relative z-10">
        <SectionHeading eyebrow="SERVICES" title="Electrical services." />

        <div className="mt-14 grid border-y border-white/10 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`py-9 md:px-8 md:py-11 ${
                index > 0
                  ? "border-t border-white/10 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <h3 className="max-w-xs text-base font-semibold tracking-[0.12em] text-[#F3EEE7]">
                {service.title}
              </h3>
              <p className="mt-5 max-w-sm text-base leading-7 text-[#C8C0B6] md:text-[17px]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhatToExpect() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#181B1C] py-24 text-white md:py-32">
      <Background />

      <Container className="relative z-10">
        <SectionHeading eyebrow="PROCESS" title="What to expect." />
        <div className="mt-14 grid md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`border-t border-white/10 py-9 md:px-8 md:py-11 ${
                index > 0 ? "md:border-l" : ""
              }`}
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[#B8844E]">
                {step.number}
              </p>
              <h3 className="mt-7 text-base font-semibold tracking-[0.12em] text-[#F3EEE7]">
                {step.title}
              </h3>
              <p className="mt-5 max-w-sm text-base leading-7 text-[#C8C0B6] md:text-[17px]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-[#181B1C] py-24 text-white md:py-32"
    >
      <Background />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
              CONTACT
            </p>
            <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#F3EEE7] md:text-5xl lg:text-6xl">
              Ready to discuss your project?
            </h2>
          </div>

          <ConsultationButton />
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-7 text-sm text-white/50 sm:flex-row sm:items-center sm:gap-3">
          <span>Summerland, British Columbia</span>
          <span className="hidden text-white/20 sm:inline">•</span>
          <span>Serving the Okanagan</span>
          <span className="hidden text-white/20 sm:inline">•</span>
          <span>Residential &amp; Commercial</span>
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

          <p className="mt-6 text-xs text-white/35">
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

export default function GiantsHeadElectricalHomepagePage() {
  return (
    <main className="min-h-screen bg-[#181B1C]">
      <Header />
      <Hero />
      <Services />
      <WhatToExpect />
      <Contact />
      <FooterSection />
    </main>
  );
}