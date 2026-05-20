"use server";

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function signInWithEmailPassword(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = createServerSupabaseClient();

  await supabase.auth.signOut();

  redirect("/login");
}
