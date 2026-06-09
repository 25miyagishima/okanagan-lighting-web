import type { ReactNode } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/#operate", label: "HOW WE OPERATE" },
  { href: "/#services", label: "SERVICES" },
  { href: "/consultation", label: "CONSULTATION" },
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
            ABOUT
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-[#F3EEE7] md:text-7xl lg:text-8xl">
            A professional service organization built on thoughtful planning,
            clear communication, and professional execution.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#C8C0B6] md:mt-10 md:text-2xl">
            Giants Head Electrical Contracting provides electrical and lighting
            services throughout the Okanagan while maintaining a strong focus on
            preparation, organization, and customer experience.
          </p>
        </div>
      </div>
    </section>
  );
}

function ApproachCard({
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

function WhoWeAreSection() {
  return (
    <SectionShell id="who-we-are" eyebrow="WHO WE ARE" title="Built on simple ideas.">
      <div className="max-w-3xl space-y-5 text-xl leading-relaxed text-[#C8C0B6]">
        <p>Projects begin with people.</p>

        <p>
          Understanding customer goals, project requirements, and the realities
          of the environment creates a stronger foundation for decision-making
          and project delivery.
        </p>

        <p>
          The objective is to deliver solutions that align with customer goals
          while maintaining professionalism, communication, and attention to
          detail throughout the process.
        </p>
      </div>
    </SectionShell>
  );
}

function ProjectApproachSection() {
  return (
    <SectionShell
      id="project-approach"
      eyebrow="HOW WE APPROACH PROJECTS"
      title="Understand. Plan. Execute. Improve."
    >
      <div className="grid gap-9 md:grid-cols-2">
        <ApproachCard title="UNDERSTAND">
          Every project begins with understanding the customer, the space, and
          the objectives behind the work.
        </ApproachCard>

        <ApproachCard title="PLAN">
          Information is organized, requirements are documented, and solutions
          are developed with the project goals in mind.
        </ApproachCard>

        <ApproachCard title="EXECUTE">
          Projects are delivered safely, professionally, and with attention to
          detail.
        </ApproachCard>

        <ApproachCard title="IMPROVE">
          Experience gained through completed projects helps strengthen future
          planning, communication, and project delivery.
        </ApproachCard>
      </div>
    </SectionShell>
  );
}

function OperationalSystemsSection() {
  return (
    <SectionShell
      id="operational-systems"
      eyebrow="OPERATIONAL SYSTEMS"
      title="Supporting project delivery."
    >
      <div className="max-w-3xl space-y-5 text-xl leading-relaxed text-[#C8C0B6]">
        <p>
          Internal operational systems support documentation, organization, and
          project delivery throughout the business.
        </p>

        <p>
          These systems help maintain consistency, improve access to
          information, and support professional project execution.
        </p>

        <a
          href="/operational-systems"
          className="mt-6 inline-flex min-h-12 items-center justify-center border border-[#B8844E]/60 bg-white/[0.02] px-6 text-xs font-bold tracking-[0.14em] text-white transition hover:border-[#B8844E] hover:bg-[#B8844E]/10"
        >
          LEARN MORE ABOUT OPERATIONAL SYSTEMS →
        </a>
      </div>
    </SectionShell>
  );
}

function CommunitySection() {
  return (
    <SectionShell
      id="community"
      eyebrow="COMMUNITY"
      title="Proudly rooted in Summerland, serving the Okanagan."
    >
      <p className="max-w-3xl text-xl leading-relaxed text-[#C8C0B6]">
        We are proud to call the Okanagan home and grateful for the opportunity
        to serve the homeowners, businesses, and communities that make this
        region unique.
      </p>
    </SectionShell>
  );
}

function ContactSection() {
  return (
    <SectionShell id="contact" eyebrow="CONTACT" title="Request a consultation.">
      <p className="max-w-3xl text-xl leading-relaxed text-[#C8C0B6]">
        For electrical work, lighting projects, or future project discussions,
        reach out and define the next step.
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
            <a href="/#services" className="block transition hover:text-[#B8844E]">
              Services
            </a>
            <a href="/consultation" className="block transition hover:text-[#B8844E]">
              Consultation
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#181B1C]">
      <Nav />
      <HeroSection />
      <WhoWeAreSection />
      <ProjectApproachSection />
      <OperationalSystemsSection />
      <CommunitySection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}