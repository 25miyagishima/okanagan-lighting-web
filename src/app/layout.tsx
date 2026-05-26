import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-[#0D0E10] text-[#F5F5F1] antialiased">
        {children}
      </body>
    </html>
  );
}