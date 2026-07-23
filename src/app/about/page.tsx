import type { ReactNode } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/#services", label: "SERVICES" },
  { href: "/consultation", label: "CONSULTATION" },
  { href: "#contact", label: "CONTACT" },
];

function Background({ opacity = "opacity-100" }: { opacity?: string }) {
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
      aria-label="Giants Head Electrical Contracting homepage"
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
                className={`text-xs tracking-[0.18em] transition-colors duration-300 hover:text-[#B8844E] lg:text-sm ${
                  item.href === "/about"
                    ? "text-[#B8844E]"
                    : "text-white/70"
                }`}
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

function HeroSection() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-[#181B1C] text-white">
      <Background />

      <div className="relative z-10 flex min-h-[78vh] flex-col justify-center px-6 pb-16 pt-36 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-7 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
            ABOUT
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.055em] text-[#F3EEE7] md:text-7xl lg:text-8xl">
            Built on experience.
            <br />
            Driven by quality.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#C8C0B6] md:mt-10 md:text-2xl">
            Giants Head Electrical Contracting is owned and operated by Aaron
            Miyagishima, a Red Seal electrician based in Summerland, British
            Columbia. Every project is approached with clear communication,
            thoughtful planning, and professional workmanship.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContentSection({
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
      className="relative scroll-mt-28 overflow-hidden border-b border-white/10 bg-[#181B1C] px-6 py-20 text-white md:px-12 md:py-28 lg:px-16"
    >
      <Background opacity="opacity-35" />

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

function MeetAaronSection() {
  return (
    <ContentSection id="meet-aaron" eyebrow="OWNER & ELECTRICIAN" title="Meet Aaron.">
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
        <p>
          Aaron has always enjoyed work that combines technical problem-solving
          with practical craftsmanship. As a Red Seal electrician, he brings
          experience across residential and commercial electrical projects,
          along with a passion for creating spaces that are both functional and
          thoughtfully designed.
        </p>

        <p>
          One thing that has remained constant throughout his career is the
          importance of communication. Too often, homeowners and business owners
          are asked to make important decisions without fully understanding the
          options available to them. Aaron believes every customer deserves the
          time and information needed to make confident decisions about their
          project.
        </p>

        <p>
          Whether the job is a service upgrade, renovation, new construction, or
          lighting installation, his approach remains the same: listen first,
          plan carefully, and deliver work that reflects a high standard of
          quality and professionalism.
        </p>
      </div>
    </ContentSection>
  );
}

function ApproachSection() {
  return (
    <ContentSection
      id="our-approach"
      eyebrow="OUR APPROACH"
      title="Understanding comes first."
    >
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
        <p className="text-xl font-medium text-[#F3EEE7] md:text-2xl">
          Every project begins with understanding the customer&apos;s goals.
        </p>

        <p>
          No two homes, businesses, or projects are exactly alike, which is why
          we believe the best results come from listening first. Taking the time
          to understand how a space is used, what challenges exist, and what the
          customer hopes to achieve allows us to recommend solutions that are
          practical, well planned, and built to last.
        </p>

        <p>
          Our role goes beyond installing electrical systems. It&apos;s about
          providing guidance, communicating clearly, and delivering work that
          customers can feel confident in long after the project is complete.
        </p>
      </div>
    </ContentSection>
  );
}

function CommitmentSection() {
  return (
    <ContentSection
      id="our-commitment"
      eyebrow="OUR COMMITMENT"
      title="Professional from start to finish."
    >
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
        <p className="text-xl font-medium text-[#F3EEE7] md:text-2xl">
          Professionalism isn&apos;t just about the quality of the finished
          work—it&apos;s about the entire experience.
        </p>

        <p>
          From the first conversation to the final walkthrough, we&apos;re
          committed to clear communication, thoughtful workmanship, and
          delivering electrical solutions that customers can trust for years to
          come.
        </p>
      </div>
    </ContentSection>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden bg-[#141718] px-6 py-24 text-white md:px-12 md:py-32 lg:px-16"
    >
      <Background opacity="opacity-45" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#141718]/95 via-[#181B1C]/88 to-[#1F2223]/75" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
        <div>
          <p className="mb-6 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
            START A CONVERSATION
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#F3EEE7] md:text-6xl lg:text-7xl">
            Ready to start your project?
          </h2>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
            Whether you&apos;re planning a renovation, building something new,
            or simply need professional electrical services, we&apos;d be happy
            to learn more about your project.
          </p>

          <a
            href="/consultation"
            className="mt-10 inline-flex min-h-14 items-center justify-center border border-[#B8844E] bg-[#B8844E] px-8 text-xs font-bold tracking-[0.16em] text-[#141718] transition duration-300 hover:bg-[#C8935D]"
          >
            REQUEST A CONSULTATION
          </a>
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8 text-base text-white/80 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 md:text-lg">
          <ContactLine
            icon={Mail}
            text="aaron@giantsheadelectrical.ca"
            href="mailto:aaron@giantsheadelectrical.ca"
          />

          <ContactLine
            icon={Phone}
            text="Consultations available upon request"
          />

          <ContactLine
            icon={MapPin}
            text="Summerland, British Columbia"
          />
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  icon: Icon,
  text,
  href,
}: {
  icon: LucideIcon;
  text: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon className="h-5 w-5 shrink-0 text-[#B8844E]" />
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-4 transition-colors duration-300 hover:text-[#B8844E]"
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-4">{content}</div>;
}

function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#111315] px-6 py-14 text-white md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 text-sm text-white/55 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <h2 className="mb-4 text-base font-semibold tracking-[0.16em] text-white">
            GIANTS HEAD ELECTRICAL CONTRACTING LTD.
          </h2>

          <p>Electrical · Lighting</p>
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

            <a
              href="/about"
              className="block transition hover:text-[#B8844E]"
            >
              About
            </a>

            <a
              href="/#services"
              className="block transition hover:text-[#B8844E]"
            >
              Services
            </a>

            <a
              href="/consultation"
              className="block transition hover:text-[#B8844E]"
            >
              Consultation
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-[0.16em] text-white">
            CONTACT
          </h3>

          <div className="space-y-2">
            <a
              href="mailto:aaron@giantsheadelectrical.ca"
              className="block transition hover:text-[#B8844E]"
            >
              Email
            </a>

            <a
              href="/consultation"
              className="block transition hover:text-[#B8844E]"
            >
              Request a Consultation
            </a>

            <a
              href="/operations"
              aria-label="Operations access"
              className="mt-5 inline-block text-lg leading-none text-[#B8844E]/25 transition duration-300 hover:text-[#B8844E]"
            >
              •
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/35">
        © 2026 Giants Head Electrical Contracting Ltd.
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#181B1C]">
      <Nav />
      <HeroSection />
      <MeetAaronSection />
      <ApproachSection />
      <CommitmentSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}