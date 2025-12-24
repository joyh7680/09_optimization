"use client";

import { useRouter } from "next/navigation";
import { getLatestPosts } from "@/post.service";

export default function Home() {

  const router = useRouter();
  const latestPosts = getLatestPosts(3);


  // ❌ SEO 문제: div 남발, 시맨틱 태그 없음
  return (
    <>
      {/* ❌ SEO 문제: main 태그 대신 div 사용 */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* ❌ SEO 문제: 실제 페이지 제목에 h1이 없음 (로고에 썼음) */}  
          <div className="text-5xl font-bold text-gray-900 mb-4">
            개발자를 위한 기술 블로그
          </div>
          <p className="text-xl text-gray-600">
            최신 웹 개발 트렌드와 기술을 공유합니다
          </p>
        </div>

        {/* ❌ SEO 문제: section 태그 없이 div로 구성 */}
        <div className="mb-12">
          <div className="text-3xl font-bold text-gray-900 mb-8">
            최신 포스트
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              // ❌ SEO 문제: article 태그 대신 div 사용
              <div 
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 w-full">
                  {/* ❌ SEO 문제: img 태그에 alt 속성 누락 */}
                  <img 
                    src={post.imageUrl}
                    className="object-cover"
                  />
                </div>
                
                
                <div className="p-6">
                  {/* ❌ SEO 문제: 제목에 h 태그 사용하지 않음 */}
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    <span>{post.title}</span>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    {post.date} · {post.readTime}
                  </div>
                  
                  <div className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </div>
                  
                  {/* ❌ SEO 문제: 링크 대신 button 사용 */}
                  <button
                    onClick={() => router.push(`/blog/${post.id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    더 읽기 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ❌ SEO 문제: 링크 대신 button 사용 */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/blog")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            모든 포스트 보기
          </button>
        </div>
      </div>
    </>
  );
}
