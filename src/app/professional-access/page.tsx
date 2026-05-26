import Link from "next/link";
import { LoginForm } from "@/features/auth/login-form";

export default function ProfessionalAccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0E10] px-4 py-10 text-[#F5F5F1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,139,45,0.14),transparent_28%),linear-gradient(180deg,#050607_0%,#0D0E10_100%)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      <div className="absolute bottom-[-10%] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#D88B2D]/[0.05] blur-3xl" />

      <section className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex justify-center">
  <div className="flex flex-col items-center leading-none">
    <div className="-mb-3 flex h-12 w-52 justify-center">
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

    <div className="-mt-2 font-serif text-[20px] tracking-[0.28em] text-[#FFF9EA]">
      OKANAGAN
    </div>

    <div className="mt-[1px] text-center text-[11px] tracking-[0.4em] text-[#D99A18]">
      LIGHTING
    </div>
  </div>
</div>

        <div className="rounded-[2rem] border border-white/[0.06] bg-[#181A1D]/90 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(216,139,45,0.05)] backdrop-blur-xl">
          <div className="mb-7 text-center">
            <p className="mb-3 text-xs tracking-[0.22em] text-[#D88B2D]">
              PROFESSIONAL ACCESS
            </p>

            <h1 className="font-serif text-3xl tracking-[-0.03em] text-[#F5F5F1]">
              Okanagan Lighting Systems
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Secure access to the operational platform.
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <Link
              href="/"
              className="text-xs tracking-[0.16em] text-white/45 transition-colors duration-300 hover:text-[#E2B15A]"
            >
              RETURN TO HOMEPAGE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}