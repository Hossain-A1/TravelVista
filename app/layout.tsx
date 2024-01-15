import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navber from "@/components/shared/Navber";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelVista",
  description: "Book a hotel which is you want",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <main className='flex flex-col min-h-screen bg-secondary'>
            <Navber />

            <section className='flex-grow'>{children}</section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
