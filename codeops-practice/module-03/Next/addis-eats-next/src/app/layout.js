import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Componets/Header";
import Footer from "./Componets/Footer";
import Providers from "./providers";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Addis Eats | Ethiopian food delivery",
    template: "%s | Addis Eats",
  },
  description:
    "Order traditional Ethiopian dishes, from doro wat to tibs, delivered fresh in Addis Ababa.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased  ${inter.className}`}
    >
      <body className="min-h-screen flex flex-col ">
        <Providers>
          <Header />
          <main className="flex-1 pb-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
