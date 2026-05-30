import type { ReactNode } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const navItems = [
  { href: "#home", label: "HOME" },
  { href: "#professional-access", label: "PROFESSIONAL ACCESS" },
  { href: "#contact", label: "CONTACT" },
];

function HeroBackdrop({ opacity = "opacity-100" }: { opacity?: string }) {
  return (
    <div className={`absolute inset-0 ${opacity}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_43%,rgba(216,139,45,.16),transparent_18%),linear-gradient(180deg,#030405_0%,#0D0E10_100%)] md:bg-[radial-gradient(circle_at_72%_43%,rgba(216,139,45,.18),transparent_18%),linear-gradient(180deg,#030405_0%,#0D0E10_100%)]" />
      <div className="absolute inset-x-0 top-[20%] h-[26%] bg-[linear-gradient(178deg,transparent_0%,transparent_42%,rgba(0,0,0,.98)_43%,rgba(0,0,0,.98)_100%)]" />
      <div className="absolute inset-x-0 top-[28%] h-[28%] bg-[radial-gradient(ellipse_at_center,rgba(216,139,45,.18),transparent_42%)] blur-sm md:bg-[radial-gradient(ellipse_at_center,rgba(216,139,45,.28),transparent_42%)]" />
      <div className="absolute inset-x-0 top-[34%] h-[2px] bg-gradient-to-r from-transparent via-[#D88B2D]/60 to-transparent blur-[1px]" />
      <div className="absolute bottom-0 right-0 h-[48%] w-[58%] rounded-tl-[8rem] bg-[linear-gradient(135deg,rgba(18,20,22,.95),rgba(3,4,5,.98))] shadow-[0_0_90px_rgba(0,0,0,.9)]" />
      <div className="absolute bottom-[16%] right-[6%] h-[17%] w-[42%] bg-[linear-gradient(90deg,transparent,rgba(216,139,45,.35),transparent)] blur-xl" />
      <div className="absolute bottom-[7%] left-0 h-[32%] w-full bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}

function Logo() {
  return (
    <a
      href="#home"
      className="relative z-20 flex flex-col items-center leading-none transition-opacity duration-300 hover:opacity-90"
      aria-label="Go to home section"
    >
      <div className="-mb-4 flex h-14 w-56 justify-center md:h-16 md:w-64 lg:h-20 lg:w-72">
        <svg
          viewBox="240 285 1220 190"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ridgeGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A5200" stopOpacity="0" />
              <stop offset="18%" stopColor="#D99313" />
              <stop offset="50%" stopColor="#FFF4C2" />
              <stop offset="82%" stopColor="#D99313" />
              <stop offset="100%" stopColor="#8A5200" stopOpacity="0" />
            </linearGradient>

            <filter id="ridgeGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M250 386
               C360 350, 475 326, 565 318
               C642 312, 690 330, 760 318
               C820 308, 860 280, 920 282
               C990 284, 1050 318, 1202 326
               C1285 328, 1355 340, 1450 388"
            fill="none"
            stroke="url(#ridgeGold)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ridgeGlow)"
          />

          <path
            d="M250 386
               C360 350, 475 326, 565 318
               C642 312, 690 330, 760 318
               C820 308, 860 280, 920 282
               C990 284, 1050 318, 1202 326
               C1285 328, 1355 340, 1450 388"
            fill="none"
            stroke="#FFE8A3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="-mt-3 font-serif text-[22px] tracking-[0.31em] text-[#FFF9EA] drop-shadow-[0_0_10px_rgba(255,249,234,.18)] md:text-[25px] lg:text-[28px]">
        OKANAGAN
      </div>

      <div className="mt-[2px] text-center text-[13px] tracking-[0.42em] text-[#D99A18] md:text-[14px] lg:text-[15px]">
        LIGHTING
      </div>
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between bg-[#0D0E10]/40 px-6 py-5 backdrop-blur-md md:px-12 lg:px-16">
      <Logo />

      <nav className="hidden items-center md:flex" aria-label="Main navigation">
        <div className="flex items-center gap-4 lg:gap-5">
          {navItems.map((item, index) => (
            <div key={item.href} className="flex items-center gap-4 lg:gap-5">
              {index !== 0 && (
                <span className="text-[13px] text-white/45">·</span>
              )}

              <a
                href={item.href}
                className="text-xs tracking-[0.18em] text-white transition-colors duration-300 hover:text-[#E2B15A] lg:text-sm"
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

function Feature({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-h-32 items-start gap-7 border-white/20 pr-8 md:border-r md:last:border-r-0">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#D88B2D]/70 text-3xl text-[#D88B2D] shadow-[0_0_18px_rgba(216,139,45,.12)]">
        {icon}
      </div>

      <div>
        <h3 className="mb-4 tracking-[0.14em] text-[#E2B15A]">{title}</h3>
        <p className="max-w-sm text-lg leading-relaxed text-white/80">
          {children}
        </p>
      </div>
    </article>
  );
}

function HomeSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0D0E10] text-white"
    >
      <HeroBackdrop />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/12 to-black/10" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-8 pt-36 md:px-12 lg:px-16">
        <section className="mb-16 max-w-4xl lg:mb-20">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,.12)] md:text-7xl lg:text-8xl">
            Architectural Lighting Systems
            <br />
            for Elevated Living
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/90 md:mt-10 md:text-2xl">
            Designed to enhance architecture, atmosphere, and the way spaces are experienced.
          </p>
        </section>

        <section className="grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <Feature icon="⌬" title="DESIGN FOCUSED">
            Curated lighting plans designed for how each space is lived in.
          </Feature>

          <Feature icon="△" title="TECHNOLOGY DRIVEN">
            Advanced systems and intelligent controls for seamless performance.
          </Feature>

          <Feature icon="◎" title="PREMIUM EXPERIENCE">
            Catered service from concept to completion and beyond.
          </Feature>
        </section>
      </div>
    </section>
  );
}

function SectionShell({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-28 overflow-hidden bg-[#0D0E10] px-6 py-16 text-white md:px-12 md:py-20 lg:px-16"
    >
      <HeroBackdrop opacity="opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/45" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl rounded-3xl border border-white/10 bg-[#0D0E10]/75 p-7 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-md md:p-9 lg:p-12">
          {children}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <SectionShell id="process">
      <p className="mb-5 tracking-[0.22em] text-[#D88B2D]">
        ABOUT OKANAGAN LIGHTING
      </p>

      <h2 className="font-serif text-4xl leading-tight md:text-6xl">
        Thoughtfully Designed Lighting
        <br />
        for Spaces Meant to Be Lived In.
      </h2>

      <p className="mt-7 text-lg leading-relaxed text-white/78 md:text-xl">
        Okanagan Lighting creates thoughtfully designed lighting environments for homes,
        outdoor living spaces, hospitality properties, and select commercial environments
        throughout the Okanagan.
      </p>

      <p className="mt-5 text-lg leading-relaxed text-white/78 md:text-xl">
        Every project begins with conversation, collaboration, and understanding how a
        space is experienced day to day. From quiet exterior ambiance to warm interior
        lighting, each system is carefully designed to feel natural, refined, and
        effortless within the space.
      </p>

      <p className="mt-5 text-lg leading-relaxed text-white/78 md:text-xl">
        Behind the scenes, organized planning, reliable systems, and years of installation
        experience ensure every detail is executed with care — allowing the customer
        experience itself to remain calm, personal, and approachable.
      </p>

      <div className="mt-10 border-t border-white/10 pt-8">
        <p className="mb-4 tracking-[0.22em] text-[#D88B2D]">OUR APPROACH</p>

        <p className="max-w-2xl text-xl leading-relaxed text-white/86 md:text-2xl">
          Lighting should feel effortless. Every system is carefully considered to enhance
          atmosphere, comfort, and the overall experience of a space.
        </p>
      </div>
    </SectionShell>
  );
}

function ProfessionalAccessSection() {
  return (
    <SectionShell id="professional-access">
      <p className="mb-5 tracking-[0.22em] text-[#D88B2D]">
        OKANAGAN LIGHTING SYSTEMS
      </p>

      <h2 className="font-serif text-4xl leading-tight md:text-6xl">
        Professional Access
        <br />
        to the Systems Platform.
      </h2>

      <p className="mt-7 text-lg leading-relaxed text-white/78 md:text-xl">
        Okanagan Lighting Systems serves as the operational backbone behind the customer
        experience — providing organized workflows, project systems, and lighting tools
        developed for professionals in the field.
      </p>

      <p className="mt-5 text-lg leading-relaxed text-white/78 md:text-xl">
        Designed for builders, installers, landscape companies, and lighting professionals,
        the platform supports planning, quoting, installation organization, and long-term
        project management while maintaining the calm and thoughtful experience clients
        expect from Okanagan Lighting.
      </p>

      <a
        href="/professional-access"
        className="mt-10 inline-flex rounded-sm border border-[#D88B2D]/40 bg-white/5 px-8 py-4 font-semibold tracking-[0.14em] text-white shadow-[0_0_24px_rgba(216,139,45,.08)] transition hover:border-[#D88B2D]/70 hover:bg-[#D88B2D]/10 hover:shadow-[0_0_32px_rgba(216,139,45,.18)]"
      >
        REQUEST PLATFORM ACCESS
      </a>
    </SectionShell>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden bg-[#0D0E10] px-6 py-16 text-white md:px-12 md:py-20 lg:px-16"
    >
      <HeroBackdrop opacity="opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl rounded-3xl border border-white/10 bg-[#0D0E10]/75 p-7 shadow-[0_20px_80px_rgba(0,0,0,.45)] backdrop-blur-md md:p-9 lg:p-12">
          <p className="mb-5 tracking-[0.22em] text-[#D88B2D]">
            PLATFORM ACCESS
          </p>

          <div className="space-y-5 text-base text-white/85 md:text-lg">
            <ContactLine icon={Mail} text="systems@okanaganlighting.ca" />
            <ContactLine
              icon={Phone}
              text="Professional onboarding available upon request"
            />
            <ContactLine icon={MapPin} text="Okanagan, British Columbia" />
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <a
              href="https://okanaganlighting.ca"
              className="inline-flex text-sm tracking-[0.18em] text-white/70 transition hover:text-[#E2B15A]"
            >
              Explore Okanagan Lighting →
            </a>
          </div>
        </div>
      </div>
    </section>
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
      <Icon className="h-5 w-5 shrink-0 text-[#D88B2D]" />
      <span>{text}</span>
    </div>
  );
}

export default function OkanaganLightingSystemsHomepagePage() {
  return (
    <main className="min-h-screen bg-[#0D0E10]">
      <Nav />
      <HomeSection />
      <ProcessSection />
      <ProfessionalAccessSection />
      <ContactSection />
    </main>
  );
}