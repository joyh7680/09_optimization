export default function Footer() {
  return (
    // o SEO 문제: footer 태그 대신 div 사용
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-400">© 2024 DevBlog. All rights reserved.</p>
      </div>
    </footer>
  );
}
