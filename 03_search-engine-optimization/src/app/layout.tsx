import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ❌ SEO 문제 1: meta description 누락 
// ❌ SEO 문제 2: title이 너무 짧고 구체적이지 않음
// ❌ SEO 문제 3: Open Graph(OG) 태그 누락 
// ❌ SEO 문제 4: metadataBase가 없어서 OG 이미지 경로설정시 문제 발생 여지 있음 
export const metadata: Metadata = {
  title: "블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

          <Header />

          {children}
          
          <Footer />
          
        </div>
      </body>
    </html>
  );
}
