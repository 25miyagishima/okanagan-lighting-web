import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Okanagan Lighting
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Sign in to manage quotes, jobs, invoices, and scheduling.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <LoginForm />
      </div>
    </div>
  );
}
