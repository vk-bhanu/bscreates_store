import type { Metadata } from "next";
import  { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/provider/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Basundhra Creates Store",
  description: "Basundhra Creates Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          <Navbar/>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
