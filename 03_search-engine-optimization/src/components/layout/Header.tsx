"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    // ❌ SEO 문제: header 태그 대신 div 사용
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* ❌ SEO 문제: 로고에 h1 사용 (잘못된 관행) */}
        {/* <h1 className="text-2xl font-bold text-blue-600">
          <button onClick={() => router.push("/")}>DevBlog</button>
        </h1> */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/" aria-label="DevBlog 홈으로 이동">
            DevBlog
          </Link>
        </div>

        <nav aria-label="주요 메뉴">
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                블로그
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                소개
              </Link>
            </li>
          </ul>
        </nav>

        {/* ❌ SEO 문제: nav 태그 없이 div로 메뉴 구성 */}
        {/* ❌ SEO 문제: button으로 페이지 이동 (크롤러가 못 따라감) */}
        {/* <div className="flex gap-6" aria-label="주요 메뉴">
          <button
            onClick={() => router.push("/")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            홈
          </button>
          <button
            onClick={() => router.push("/blog")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            블로그
          </button>
          <button
            onClick={() => router.push("/about")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            소개
          </button>
        </div> */}
      </div>
    </header>
  );
}
