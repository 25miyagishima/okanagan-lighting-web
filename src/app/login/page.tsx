import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D0E10] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#F5F5F1]">
            Okanagan Lighting
          </h1>

          <p className="mt-2 text-sm text-[#9EA3AA]">
            Sign in to manage quotes, jobs, invoices, and scheduling.
          </p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#181A1D] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}