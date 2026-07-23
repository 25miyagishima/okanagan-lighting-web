"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.push("/operations");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSigningOut}
      className="w-full rounded-xl border border-red-400/10 bg-red-500/[0.04] px-3 py-2 text-left text-sm font-medium text-red-300 transition-colors hover:border-red-400/20 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSigningOut ? "Signing out..." : "Sign out"}
    </button>
  );
}