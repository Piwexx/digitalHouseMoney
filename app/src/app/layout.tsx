import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import "./globals.css";
import Footer from "@/ui/home/Footer";

const openSans = Open_Sans({
  subsets: ['latin'],  
  weight: ['400', '700'],  
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: "Digital House Money",
  description: "Digital House Money",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" >
        <body
          className={`${openSans.variable} antialiased`}
        >
          {children}
          <Footer/>
        </body>
      </html>
  );
}
