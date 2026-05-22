"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setErrorMessage(null);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label
          className="text-sm font-medium text-[#F5F5F1]"
          htmlFor="email"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          className="text-sm font-medium text-[#F5F5F1]"
          htmlFor="password"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[#F5F5F1] outline-none transition-colors placeholder:text-[#5B6068] focus:border-[#E2B15A]/40"
          placeholder="••••••••"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-b from-[#E2B15A] to-[#D88B2D] px-4 py-2 text-sm font-medium text-[#0D0E10] transition-opacity hover:opacity-90"
      >
        Sign in
      </button>
    </form>
  );
}