import Link from "next/link";
import { LoginForm } from "@/features/auth/login-form";

export default function ProfessionalAccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#181B1C] px-4 py-10 text-[#F3EEE7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(184,132,78,0.10),transparent_30%),linear-gradient(180deg,#141718_0%,#181B1C_50%,#1F2223_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/45" />
      <div className="absolute bottom-[-12%] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#B8844E]/[0.035] blur-3xl" />

      <section className="relative z-10 w-full max-w-md">
        <div className="mb-7 flex justify-center">
          <Link
            href="/"
            className="flex flex-col items-center leading-none transition-opacity duration-300 hover:opacity-90"
            aria-label="Return to Giants Head Electrical Contracting homepage"
          >
            <div className="text-[14px] font-semibold tracking-[0.24em] text-[#F3EEE7]">
              GIANTS HEAD
            </div>

            <div className="mt-1 text-[10px] tracking-[0.32em] text-[#B8844E]">
              ELECTRICAL CONTRACTING LTD.
            </div>
          </Link>
        </div>

        <div className="rounded-[1.75rem] border border-white/[0.08] bg-[#202324]/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.42),0_0_0_1px_rgba(184,132,78,0.04)] backdrop-blur-xl">
          <div className="mb-7 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
              PROFESSIONAL ACCESS
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#F3EEE7]">
              Operational Systems
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Secure access to internal operational tools and approved
              professional workflows.
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <Link
              href="/"
              className="text-xs tracking-[0.16em] text-white/45 transition-colors duration-300 hover:text-[#B8844E]"
            >
              RETURN TO HOMEPAGE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}