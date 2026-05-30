import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://systems.okanaganlighting.ca"),

  title: {
    default: "Okanagan Lighting Systems",
    template: "%s | Okanagan Lighting Systems",
  },

  description:
    "Professional lighting quote, job, invoice, and project workflow platform for Okanagan Lighting.",

  openGraph: {
    title: "Okanagan Lighting Systems",
    description:
      "Professional lighting quote, job, invoice, and project workflow platform for Okanagan Lighting.",
    url: "https://systems.okanaganlighting.ca",
    siteName: "Okanagan Lighting Systems",
    locale: "en_CA",
    type: "website",
    images: ["/og-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Okanagan Lighting Systems",
    description:
      "Professional lighting quote, job, invoice, and project workflow platform for Okanagan Lighting.",
    images: ["/og-image.jpg"],
  },
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