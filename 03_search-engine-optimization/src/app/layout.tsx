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

/*
// ❌ SEO 문제 1: meta description 누락 
// ❌ SEO 문제 2: title이 너무 짧고 구체적이지 않음
// ❌ SEO 문제 3: Open Graph(OG) 태그 누락 
// ❌ SEO 문제 4: metadataBase가 없어서 OG 이미지 경로설정시 문제 발생 여지 있음 
export const metadata: Metadata = {
  title: "블로그",
};
*/

// ✅ SEO 개선: metadataBase + title 템플릿 + description + OG/Twitter
export const metadata: Metadata = {
  // 배포 도메인으로 바꾸세요. (예: https://devblog.com)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  ),

  title: {
    default: "DevBlog | 개발자를 위한 기술 블로그",
    template: "%s | DevBlog",
  },
  description:
    "DevBlog는 개발자들이 최신 기술 트렌드와 실무 경험을 공유하는 기술 블로그 플랫폼입니다.",

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/", // metadataBase 기준으로 절대 URL이 만들어짐
    siteName: "DevBlog",
    title: "DevBlog | 개발자를 위한 기술 블로그",
    description:
      "DevBlog는 개발자들이 최신 기술 트렌드와 실무 경험을 공유하는 기술 블로그 플랫폼입니다.",
    images: [
      {
        url: "/og.png", // public/og.png 권장
        width: 1200,
        height: 630,
        alt: "DevBlog Open Graph Image",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DevBlog | 개발자를 위한 기술 블로그",
    description:
      "DevBlog는 개발자들이 최신 기술 트렌드와 실무 경험을 공유하는 기술 블로그 플랫폼입니다.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/", // metadataBase 기준
  },

  icons: {
    icon: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },
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
