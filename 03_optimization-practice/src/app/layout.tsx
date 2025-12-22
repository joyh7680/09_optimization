import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Noto_Sans_KR, Playfair_Display, Roboto_Mono } from "next/font/google";

// ✅ 폰트 최적화: 외부 CDN <link> 제거하고 next/font 사용 (자동 서브셋/프리로드)
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

// ✅ SEO 메타데이터 확장
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"), // 배포 도메인으로 바꾸기
  title: {
    default: "맛있는 레시피",
    template: "%s | 맛있는 레시피",
  },
  description:
    "쉽고 맛있는 레시피 모음. 인기 레시피, 최신 레시피, 카테고리별 추천까지 한 번에!",
  applicationName: "맛있는 레시피",
  keywords: ["레시피", "요리", "한식", "간단요리", "홈쿠킹"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://example.com",
    siteName: "맛있는 레시피",
    title: "맛있는 레시피",
    description: "쉽고 맛있는 레시피 모음. 인기/최신/카테고리 추천 제공",
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "맛있는 레시피" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "맛있는 레시피",
    description: "쉽고 맛있는 레시피 모음",
    // images: ["/og.png"],
  },
  alternates: {
    canonical: "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ⚠️ 폰트 최적화 안됨: 외부 CDN에서 폰트 로드 - 렌더링 블로킹 발생
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${playfair.variable} ${robotoMono.variable}`}
    >
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&family=Playfair+Display:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head> */}
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          {/* 이 레이아웃을 사용하는 모든 page.tsx가 들어오는 자리 */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {/* ⚠️ SEO 최적화 안됨: main 태그 대신 div 사용 */}
        {/* <Header />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
        </div>
        <Footer /> */}
      </body>
    </html>
  );
}
