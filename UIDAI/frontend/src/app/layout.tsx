import type { Metadata } from "next";
import "./globals.css";
import { MainNav } from "@/components/navigation/MainNav";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

export const metadata: Metadata = {
  title: "UIDAI Analytics Platform",
  description: "AI-Powered Decision Support for Enrollment Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <MainNav />
        <Breadcrumb />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
