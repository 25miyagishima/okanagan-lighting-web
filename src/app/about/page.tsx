import type { ReactNode } from "react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/#services", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "/consultation", label: "CONTACT" },
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

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#111315]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-center px-6 md:px-12 lg:px-16">
        <nav
          className="flex items-center gap-6 md:gap-8"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[11px] font-medium tracking-[0.16em] transition-colors duration-300 hover:text-[#B8844E] ${
                item.href === "/about"
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
  Miyagishima, a Red Seal electrician based in Summerland, British Columbia,
  serving clients throughout the Okanagan.
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
  eyebrow?: string;
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
          {eyebrow && (
            <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
              {eyebrow}
            </p>
          )}

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
    <ContentSection
      id="meet-aaron"
      title="Meet Aaron."
    >
      <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
        <p>
          I've always enjoyed building things and working with my hands. I was
          equally drawn to technical problem solving, and becoming an
          electrician gave me the opportunity to combine both.
        </p>

        <p>
          What I enjoy most about this profession is that every project is
          different. Some require troubleshooting a technical problem, others
          involve careful planning, while many begin with understanding what a
          customer is trying to accomplish. Bringing those pieces together into
          a successful project is what keeps the work rewarding.
        </p>

        <p>
          Whether it's a small service call or a larger project, my approach is
          always the same: understand the customer's goals, communicate clearly,
          and deliver work that we're both proud of when the project is
          complete.
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
            Let&apos;s talk about your project.
          </h2>

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#C8C0B6] md:text-xl">
            Whether you&apos;re planning a renovation, building something new,
            or simply need professional electrical services, we&apos;d be happy
            to learn how we can help.
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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#181B1C]">
      <Nav />
<HeroSection />
<MeetAaronSection />
<ContactSection />
<FooterSection />
    </main>
  );
}