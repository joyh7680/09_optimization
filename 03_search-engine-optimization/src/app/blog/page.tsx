"use client";

import { getPosts } from "@/post.service";
import { useRouter } from "next/navigation";

export default function BlogPage() {

  const router = useRouter();
  const blogPosts = getPosts();

  // ❌ SEO 문제: div 남발, 시맨틱 태그 없음
  return (
    <>
      {/* ❌ SEO 문제: main 태그 없음 */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* ❌ SEO 문제: h1 태그 없이 스타일로만 크기 조절 */}
        <div className="text-4xl font-bold text-gray-900 mb-2">
          모든 포스트
        </div>
        <div className="text-gray-600 mb-12">
          개발에 관한 다양한 글들을 읽어보세요
        </div>

        {/* ❌ SEO 문제: 카테고리 필터를 div로 구성 */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["전체", "프론트엔드", "프로그래밍", "CSS", "최적화", "SEO"].map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap border"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ❌ SEO 문제: article 태그 대신 div 사용 */}
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => router.push(`/blog/${post.id}`)}
            >
              <div className="h-48 w-full">
                {/* ❌ SEO 문제: img 태그에 alt 누락*/}
                <img 
                  src={post.imageUrl}
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {post.readTime}
                  </span>
                </div>
                
                {/* ❌ SEO 문제: 제목에 h 태그 사용 안 함 */}
                <div className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </div>
                
                <div className="text-gray-700 mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500">
                    {post.author}
                  </div>
                  <div className="text-gray-400">
                    {post.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}