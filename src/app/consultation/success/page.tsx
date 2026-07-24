export default function ConsultationSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#181B1C] px-6 text-white">
      <section className="w-full max-w-2xl border-y border-white/10 py-20 text-center">
        <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-[#B8844E]">
          THANK YOU
        </p>

        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#F3EEE7] md:text-6xl">
          We&apos;ve received your request.
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[#C8C0B6]">
          We&apos;ll review the information you provided and follow up to
          discuss the next step.
        </p>

        <a
          href="/"
          className="mt-10 inline-flex min-h-12 items-center justify-center border border-[#B8844E] bg-[#B8844E] px-7 text-xs font-bold tracking-[0.16em] text-[#141718] transition hover:bg-[#C8935D]"
        >
          RETURN HOME
        </a>
      </section>
    </main>
  );
}