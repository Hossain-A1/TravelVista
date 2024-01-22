import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navber from "@/components/shared/Navber";
import { ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/Container";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"],weight:['100','200','300','400','500','600','700','800','900']});

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
    <html lang='en'>
      <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main className='flex flex-col min-h-screen bg-secondary'>
              <Navber />

              <section className='flex-grow'>
                <Toaster />
                <Container>{children}</Container>
              </section>
            </main>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
