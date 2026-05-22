"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-left text-sm text-[#9EA3AA] transition-colors hover:bg-red-500/10 hover:text-red-300"
    >
      Sign out
    </button>
  );
}