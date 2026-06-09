import type { ReactNode } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/#operate", label: "HOW WE OPERATE" },
  { href: "/#services", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

function HeroBackdrop({ opacity = "opacity-100" }: { opacity?: string }) {
  return (
    <div className={`absolute inset-0 ${opacity}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(184,132,78,.12),transparent_28%),linear-gradient(180deg,#141718_0%,#181B1C_48%,#1F2223_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(184,132,78,.07),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/28 via-black/8 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_47%,rgba(255,255,255,.025)_47.1%,transparent_47.7%)]" />
    </div>
  );
}

function Logo() {
  return (
    <a
      href="/"
      className="relative z-20 flex flex-col leading-none transition-opacity duration-300 hover:opacity-90"
      aria-label="Go to homepage"
    >
      <div className="text-[13px] font-semibold tracking-[0.24em] text-[#F3EEE7] md:text-sm">
        GIANTS HEAD
      </div>
      <div className="mt-1 text-[10px] tracking-[0.32em] text-[#B8844E] md:text-[11px]">
        ELECTRICAL CONTRACTING LTD.
      </div>
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#111315]/95 px-6 py-5 backdrop-blur-xl md:px-12 lg:px-16">
      <Logo />

      <nav className="hidden items-center md:flex" aria-label="Main navigation">
        <div className="flex items-center gap-4 lg:gap-5">
          {navItems.map((item, index) => (
            <div key={item.href} className="flex items-center gap-4 lg:gap-5">
              {index !== 0 && (
                <span className="text-[13px] text-white/30">·</span>
              )}
              <a
                href={item.href}
                className="text-xs tracking-[0.18em] text-white/70 transition-colors duration-300 hover:text-[#B8844E] lg:text-sm"
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#181B1C] px-6 py-20 text-white md:px-12 md:py-24 lg:px-16"
    >
      <HeroBackdrop opacity="opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141718]/92 via-[#181B1C]/86 to-[#1F2223]/72" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.55fr] lg:gap-20">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
            {eyebrow}
          </p>
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-[#F3EEE7] md:text-5xl lg:text-6xl">
            {title}
          </h2>
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-[#181B1C] text-white">
      <HeroBackdrop />

      <div className="relative z-10 flex min-h-[78vh] flex-col justify-center px-6 pb-16 pt-36 md:px-12 lg:px-16">
        <div className="max-w-7xl">
          <p className="mb-7 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
            CONSULTATION
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-[#F3EEE7] md:text-7xl lg:text-8xl">
            Have a project in mind?
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#C8C0B6] md:mt-10 md:text-2xl">
            Whether you are planning electrical work, considering a lighting
            project, or exploring an idea, the first step is a simple
            conversation.
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center border border-[#EFE4D3] bg-[#EFE4D3] px-6 text-xs font-bold tracking-[0.14em] text-[#151718] transition hover:bg-white"
            >
              REQUEST A CONSULTATION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StartHereSection() {
  return (
    <SectionShell id="start-here" eyebrow="START HERE" title="Reach out and we’ll take it from there.">
      <div className="max-w-3xl space-y-5 text-xl leading-relaxed text-[#C8C0B6]">
        <p>Send a message with a brief description of the project.</p>

        <p>
          From there, we can discuss what you are considering and determine the
          most appropriate next step together.
        </p>

        <p>
          The goal is to keep the process simple, practical, and easy to start.
        </p>
      </div>
    </SectionShell>
  );
}

function NextStepCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="border-t border-white/10 pt-6">
      <h3 className="mb-4 text-base font-semibold tracking-[0.12em] text-[#F3EEE7]">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-[#C8C0B6] md:text-[17px]">
        {children}
      </p>
    </article>
  );
}

function WhatHappensNextSection() {
  return (
    <SectionShell id="next" eyebrow="WHAT HAPPENS NEXT" title="A simple next step.">
      <div className="grid gap-9 md:grid-cols-3">
        <NextStepCard title="SEND A MESSAGE">
          Share your name, contact information, and a short note about the
          project.
        </NextStepCard>

        <NextStepCard title="WE FOLLOW UP">
          We will respond and ask for any details needed to understand the
          project better.
        </NextStepCard>

        <NextStepCard title="NEXT STEP">
          If the project is a good fit, we will arrange a consultation or
          recommend the best path forward.
        </NextStepCard>
      </div>
    </SectionShell>
  );
}

function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="REQUEST" title="Request a consultation.">
      <p className="max-w-3xl text-xl leading-relaxed text-[#C8C0B6]">
        Send a brief message and we will follow up.
      </p>

      <div className="mt-10 space-y-5 text-base text-white/85 md:text-lg">
        <ContactLine icon={Mail} text="hello@giantsheadelectric.ca" />
        <ContactLine icon={Phone} text="Consultations available upon request" />
        <ContactLine icon={MapPin} text="Summerland, British Columbia" />
      </div>
    </SectionShell>
  );
}

function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#141718] px-6 py-14 text-white md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 text-sm text-white/55 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <h2 className="mb-4 text-base font-semibold tracking-[0.16em] text-white">
            GIANTS HEAD ELECTRICAL CONTRACTING LTD.
          </h2>
          <p>Electrical • Lighting</p>
          <p>Summerland, British Columbia</p>
          <p>Serving the Okanagan</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-[0.16em] text-white">
            NAVIGATION
          </h3>
          <div className="space-y-2">
            <a href="/" className="block transition hover:text-[#B8844E]">
              Home
            </a>
            <a href="/about" className="block transition hover:text-[#B8844E]">
              About
            </a>
            <a href="/#services" className="block transition hover:text-[#B8844E]">
              Services
            </a>
            <a href="#contact" className="block transition hover:text-[#B8844E]">
              Contact
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-[0.16em] text-white">
            OPERATIONAL SYSTEMS
          </h3>
          <div className="space-y-2">
            <a
              href="/operational-systems"
              className="block transition hover:text-[#B8844E]"
            >
              Operational Systems →
            </a>
            <a
              href="/professional-access"
              className="block transition hover:text-[#B8844E]"
            >
              Professional Access →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactLine({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="h-5 w-5 shrink-0 text-[#B8844E]" />
      <span>{text}</span>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#181B1C]">
      <Nav />
      <HeroSection />
      <StartHereSection />
      <WhatHappensNextSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}