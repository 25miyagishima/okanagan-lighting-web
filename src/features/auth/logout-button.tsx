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
      className="mt-6 w-full rounded-lg border px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
    >
      Sign out
    </button>
  );
}
