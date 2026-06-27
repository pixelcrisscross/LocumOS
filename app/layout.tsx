import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LocumOS — The Intelligent Medical Shift Marketplace",
  description:
    "Hospitals post urgent medical shifts. Freelance doctors bid to fill them. LocumOS matches the right talent to the right shift in minutes.",
  keywords: ["locum doctors", "medical shifts", "hospital staffing", "freelance medicine", "healthcare marketplace"],
  openGraph: {
    title: "LocumOS — Intelligent Medical Shift Marketplace",
    description: "Where hospitals meet freelance doctors. Instant matching, zero agency fees.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
