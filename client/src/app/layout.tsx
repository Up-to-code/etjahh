import type { Metadata } from "next";
import { Almarai } from "next/font/google";
import "./globals.css";
import Navbar01Page from "@/components/navbar-01/navbar-01";

const almarai = Almarai({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-almarai",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={` ${almarai.variable} bg-zinc-100`}>
        <Navbar01Page />
        {children}
        </body>
    </html>
  );
}
