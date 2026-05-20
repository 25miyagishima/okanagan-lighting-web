import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Okanagan Lighting",
  description: "Lighting quote, job, and invoice platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-950">
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="w-full p-4 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}