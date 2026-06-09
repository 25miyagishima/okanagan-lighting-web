import type { ReactNode } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const navItems = [
  { href: "#home", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "#operate", label: "HOW WE OPERATE" },
  { href: "#services", label: "SERVICES" },
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
      href="#home"
      className="relative z-20 flex flex-col leading-none transition-opacity duration-300 hover:opacity-90"
      aria-label="Go to home section"
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

function HomeSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#181B1C] text-white"
    >
      <HeroBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-16 pt-36 md:px-12 lg:px-16">
        <div className="max-w-7xl">
          <p className="mb-7 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
            SUMMERLAND, BRITISH COLUMBIA
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-[#F3EEE7] md:text-7xl lg:text-8xl">
            Electrical contracting for homes, businesses, and lighting projects
            throughout the Okanagan.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#C8C0B6] md:mt-10 md:text-2xl">
            Thoughtful planning. Clear communication. Professional execution.
          </p>

          <p className="mt-7 text-xs font-semibold tracking-[0.18em] text-[#B8844E]">
            PROUDLY ROOTED IN SUMMERLAND, SERVING THE OKANAGAN.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/consultation"
              className="inline-flex min-h-12 items-center justify-center border border-[#D8C8B6] bg-[#D8C8B6] px-6 text-xs font-bold tracking-[0.14em] text-[#151718] transition hover:border-[#EFE4D3] hover:bg-[#EFE4D3]"
            >
              REQUEST A CONSULTATION
            </a>

            <a
              href="#operate"
              className="inline-flex min-h-12 items-center justify-center border border-[#B8844E]/60 bg-white/[0.02] px-6 text-xs font-bold tracking-[0.14em] text-white transition hover:border-[#B8844E] hover:bg-[#B8844E]/10"
            >
              HOW WE OPERATE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="border-t border-white/10 pt-6">
      <p className="mb-5 text-xs font-bold tracking-[0.16em] text-[#B8844E]">
        {number}
      </p>

      <h3 className="mb-4 text-base font-semibold tracking-[0.12em] text-[#F3EEE7]">
        {title}
      </h3>

      <div className="space-y-4 text-base leading-relaxed text-[#C8C0B6] md:text-[17px]">
        {children}
      </div>
    </article>
  );
}

function HowWeOperateSection() {
  return (
    <SectionShell
      id="operate"
      eyebrow="HOW WE OPERATE"
      title={
        <>
          Understand. Plan. Execute. Improve.
        </>
      }
    >
      <p className="max-w-3xl text-xl leading-relaxed text-[#C8C0B6]">
        Every project follows a simple principle: understand the situation
        before acting.
      </p>

      <div className="mt-11 grid gap-9 md:grid-cols-2">
        <ProcessCard number="01" title="UNDERSTAND">
          <p>
            Every project begins with understanding the customer, the space, and
            the objectives behind the work.
          </p>

          <p>
            Before recommendations are made, time is spent identifying
            requirements, priorities, constraints, and opportunities.
          </p>
        </ProcessCard>

        <ProcessCard number="02" title="PLAN">
          <p>
            Information is organized, requirements are documented, and solutions
            are developed with the project goals in mind.
          </p>

          <p>Planning helps create a clear path before work begins.</p>
        </ProcessCard>

        <ProcessCard number="03" title="EXECUTE">
          <p>
            Projects are delivered safely, professionally, and with attention to
            detail.
          </p>

          <p>
            Clear communication, preparation, and organization help ensure
            expectations remain aligned throughout the project.
          </p>
        </ProcessCard>

        <ProcessCard number="04" title="IMPROVE">
          <p>Every completed project creates experience.</p>

          <p>
            Lessons learned help refine future decisions, improve workflows, and
            strengthen project delivery over time.
          </p>
        </ProcessCard>
      </div>
    </SectionShell>
  );
}

function ServiceRow({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <article className="grid gap-4 border-b border-white/10 py-8 first:border-t md:grid-cols-[0.34fr_1fr_auto] md:gap-8">
      <h3 className="text-base font-semibold tracking-[0.12em] text-[#F3EEE7]">
        {title}
      </h3>

      <div className="max-w-2xl text-base leading-relaxed text-[#C8C0B6] md:text-[17px]">
        {children}
      </div>

      <span className="h-fit border border-white/10 px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-white/50">
        {label}
      </span>
    </article>
  );
}

function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="SERVICES"
      title="Current services. Future capability."
    >
      <p className="max-w-3xl text-xl leading-relaxed text-[#C8C0B6]">
        The company currently provides electrical and lighting services.
        Automation remains a future area of professional development and service
        expansion.
      </p>

      <div className="mt-11">
        <ServiceRow title="ELECTRICAL CONTRACTING" label="CORE SERVICE">
          <p>
            Residential and commercial electrical services delivered with
            preparation, organization, and attention to detail.
          </p>
        </ServiceRow>

        <ServiceRow title="LIGHTING" label="SPECIALIZED SERVICE">
          <p>
            Indoor and outdoor lighting projects designed around how spaces are
            used, experienced, and enjoyed.
          </p>

          <a
            href="https://okanaganlighting.ca"
            className="mt-5 inline-flex text-sm font-semibold tracking-[0.12em] text-[#B8844E] transition hover:text-[#EFE4D3]"
          >
            LEARN MORE ABOUT GIANTS HEAD LIGHTING →
          </a>
        </ServiceRow>

        <ServiceRow title="AUTOMATION" label="FUTURE DEVELOPMENT">
          <p>
            Smart controls and automation systems are an area of ongoing
            professional development and future service expansion.
          </p>
        </ServiceRow>
      </div>
    </SectionShell>
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

function ApproachSection() {
  return (
    <SectionShell
      id="approach"
      eyebrow="OUR APPROACH"
      title="Planning, communication, and execution."
    >
      <div className="grid gap-9 md:grid-cols-3">
        <ApproachCard title="THOUGHTFUL PLANNING">
          Every project begins with understanding the customer, the space, and
          the requirements before solutions are developed.
        </ApproachCard>

        <ApproachCard title="CLEAR COMMUNICATION">
          Clear expectations and consistent communication help projects run
          smoothly from start to finish.
        </ApproachCard>

        <ApproachCard title="PROFESSIONAL EXECUTION">
          Projects are delivered safely, professionally, and with attention to
          detail.
        </ApproachCard>
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
        Built on relationships, professionalism, and continuous improvement, we
        are proud to serve the homeowners, businesses, and communities that make
        the Okanagan home.
      </p>
    </SectionShell>
  );
}

function ContactSection() {
  return (
    <SectionShell
      id="contact"
      eyebrow="CONTACT"
      title="Request a consultation."
    >
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
            <a href="#operate" className="block transition hover:text-[#B8844E]">
              How We Operate
            </a>
            <a href="#services" className="block transition hover:text-[#B8844E]">
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

          <p className="max-w-sm leading-relaxed">
            Learn how Giants Head Electrical Contracting documents, validates,
            and improves project delivery.
          </p>

          <div className="mt-5 space-y-2">
            <a href="/operational-systems" className="block transition hover:text-[#B8844E]">
              Operational Systems →
            </a>
            <a href="/professional-access" className="block transition hover:text-[#B8844E]">
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

export default function GiantsHeadElectricalHomepagePage() {
  return (
    <main className="min-h-screen bg-[#181B1C]">
      <Nav />
      <HomeSection />
      <HowWeOperateSection />
      <ServicesSection />
      <ApproachSection />
      <CommunitySection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}