import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next/image 최적화 작업시 => 외부 이미지일 경우 => 도메인 허용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"], //WebP, AVIF 같은 최신 포맷 지원
    qualities: [75, 85, 95], //이미지 품질 설정
  },
};

export default nextConfig;
