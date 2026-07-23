import type { ReactNode } from "react";
import { Mail, MapPin } from "lucide-react";

const navigation = [
  { href: "/#services", label: "SERVICES" },
  { href: "/about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

function Background() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(184,132,78,.12),transparent_28%),linear-gradient(180deg,#141718_0%,#181B1C_52%,#1F2223_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(184,132,78,.07),transparent_34%)]" />
    </div>
  );
}

function Container({children}:{children:ReactNode}) {
  return <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">{children}</div>;
}

function CTA() {
  return (
    <a href="#contact" className="inline-flex min-h-12 items-center justify-center border border-[#9E744B] bg-[#9E744B] px-6 text-xs font-semibold tracking-[0.14em] text-[#F6F0E8] hover:bg-[#B8844E]">
      REQUEST A CONSULTATION
    </a>
  );
}

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#181B1C] text-white">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#111315]/95 backdrop-blur-xl">
        <Container>
          <div className="flex h-[76px] items-center justify-between">
            <a href="/" className="text-xs font-semibold tracking-[0.22em] text-[#F3EEE7]">GH</a>
            <nav className="hidden md:flex items-center gap-7">
              {navigation.map(i=>(
                <a key={i.label} href={i.href} className="text-xs tracking-[0.18em] text-white/65 hover:text-[#B8844E]">{i.label}</a>
              ))}
              <CTA />
            </nav>
          </div>
        </Container>
      </header>

      <section className="relative pt-36 pb-28 overflow-hidden">
        <Background />
        <Container>
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">CONSULTATION</p>
          <h1 className="max-w-4xl text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#F3EEE7]">
            Tell us about your project.
          </h1>
          <p className="mt-8 max-w-2xl text-xl text-[#C8C0B6] leading-relaxed">
            Whether you're planning electrical work for your home or business, the first step is a conversation.
          </p>
          <div className="mt-10"><CTA /></div>
        </Container>
      </section>

      <section id="contact" className="border-t border-white/10 py-24">
        <Container>
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">GET STARTED</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#F3EEE7]">Request a consultation.</h2>
          <p className="mt-6 max-w-2xl text-lg text-[#C8C0B6]">
            Tell us a little about your project. We'll review the information and follow up to discuss the next step.
          </p>

          <div className="mt-10 grid gap-5 max-w-3xl">
            <input placeholder="Name" className="bg-[#202425] border border-white/10 p-4"/>
            <input placeholder="Email" className="bg-[#202425] border border-white/10 p-4"/>
            <input placeholder="Phone" className="bg-[#202425] border border-white/10 p-4"/>
            <input placeholder="Project Location" className="bg-[#202425] border border-white/10 p-4"/>
            <input placeholder="Project Type" className="bg-[#202425] border border-white/10 p-4"/>
            <textarea placeholder="Tell us about your project..." rows={6} className="bg-[#202425] border border-white/10 p-4"/>
            <div><CTA /></div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 py-24">
        <Container>
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">PROCESS</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#F3EEE7]">What happens next.</h2>
          <div className="mt-14 grid md:grid-cols-3 border-y border-white/10">
            {[
              ["01","SHARE YOUR PROJECT","Tell us about what you're planning and provide any details that will help us understand the project."],
              ["02","WE'LL CONNECT","We'll review your project and get in touch to discuss the details and answer any questions."],
              ["03","MAKE A PLAN","Together, we'll determine the best approach and outline the next steps."]
            ].map(([n,t,d],i)=>(
              <div key={n} className={`py-10 md:px-8 ${i? "border-t md:border-l md:border-t-0 border-white/10":""}`}>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#B8844E]">{n}</p>
                <h3 className="mt-6 text-base font-semibold tracking-[0.12em]">{t}</h3>
                <p className="mt-4 text-[#C8C0B6] leading-7">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <footer className="border-t border-white/10 bg-[#111315] py-12">
        <Container>
          <div className="flex flex-col md:flex-row md:justify-between gap-8 text-sm text-white/40">
            <div>
              <p className="font-semibold tracking-[0.14em] text-[#F3EEE7]">GIANTS HEAD ELECTRICAL CONTRACTING LTD.</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2"><Mail size={16}/> aaron@giantsheadelectrical.ca</div>
                <div className="flex items-center gap-2"><MapPin size={16}/> Summerland, British Columbia</div>
              </div>
            </div>
            <nav className="flex gap-6">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/#services">Services</a>
            </nav>
          </div>
        </Container>
      </footer>
    </main>
  );
}