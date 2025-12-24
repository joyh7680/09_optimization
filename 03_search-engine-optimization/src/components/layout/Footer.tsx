export default function Footer() {
  return (
    // ❌ SEO 문제: footer 태그 대신 div 사용 
    <div className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-gray-400">
          © 2024 DevBlog. All rights reserved.
        </div>
      </div>
    </div>
  );
}