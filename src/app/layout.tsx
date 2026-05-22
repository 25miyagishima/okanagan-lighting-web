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
      <body className="bg-[#0D0E10] text-[#F5F5F1]">
        <div className="flex min-h-screen bg-[#0D0E10]">
          <AppSidebar />

          <main className="w-full bg-[#0D0E10]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}