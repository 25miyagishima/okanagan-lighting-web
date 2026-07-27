import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://giantsheadelectrical.ca"),

  title: {
    default: "Giants Head Electrical Contracting Ltd.",
    template: "%s | Giants Head Electrical Contracting Ltd.",
  },

  description:
    "Professional residential, commercial, and lighting electrical services in Summerland and throughout the Okanagan.",

  openGraph: {
    title: "Giants Head Electrical Contracting Ltd.",
    description:
      "Professional residential, commercial, and lighting electrical services in Summerland and throughout the Okanagan.",
    url: "https://giantsheadelectrical.ca",
    siteName: "Giants Head Electrical Contracting Ltd.",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Giants Head Electrical Contracting Ltd.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Giants Head Electrical Contracting Ltd.",
    description:
      "Professional residential, commercial, and lighting electrical services in Summerland and throughout the Okanagan.",
    images: ["/brand/og-image.jpg"],
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