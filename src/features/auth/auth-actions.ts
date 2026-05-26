"use server";

import { redirect } from "next/navigation";

export async function signInWithEmailPassword() {
  return {
    error:
      "Sign in is handled securely from the Professional Access form. Please use the login form.",
  };
}

export async function signOut() {
  redirect("/professional-access");
}
