"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function submitConsultation(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    throw new Error("Unable to submit the consultation request.");
  }

  const resend = new Resend(apiKey);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const projectType = String(formData.get("projectType") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    throw new Error("Name, email, and project details are required.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const { error } = await resend.emails.send({
    from: "Giants Head Website <consultations@giantsheadelectrical.ca>",
    to: "aaron@giantsheadelectrical.ca",
    replyTo: email,
    subject: `New consultation request from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Project location: ${location || "Not provided"}`,
      `Project type: ${projectType || "Not provided"}`,
      "",
      "Project details:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend consultation error:", error);
    throw new Error("Unable to submit the consultation request.");
  }

  redirect("/consultation/success");
}