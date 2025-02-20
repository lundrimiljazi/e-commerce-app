import { Toaster } from "sonner";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StyleHub - Fashion & Lifestyle",
  description:
    "Your one-stop destination for modern fashion and lifestyle products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased min-h-screen flex flex-col bg-white`}
      >
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <Toaster position="top-center" duration={1500} />
        <Footer />
      </body>
    </html>
  );
}
