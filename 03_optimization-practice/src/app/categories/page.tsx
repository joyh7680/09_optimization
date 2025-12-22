import Link from "next/link";
import { categories } from "@/data/categories";
import { recipes } from "@/data/recipes";
import type { Metadata } from "next";

// ⚠️ SEO 최적화 안됨: 메타데이터 없음
export const metadata: Metadata = {
  title: "카테고리 | 맛있는 레시피",
  description: "카테고리별로 레시피를 탐색해보세요.",
  alternates: { canonical: "/categories" },
  openGraph: {
    title: "카테고리 | 맛있는 레시피",
    description: "카테고리별로 레시피를 탐색해보세요.",
    url: "/categories",
    type: "website",
  },
};

export default function CategoriesPage() {
  // ✅ 카테고리별 레시피 개수 집계를 1번만 수행 (O(n))
  const countsByCategory = recipes.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});

  const categoryList = Object.values(categories)
    .map((category) => ({
      ...category,
      count: countsByCategory[category.name] ?? 0,
    }))
    // (선택) UI 안정적으로 보이게 정렬
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ko"));

  // const categoryList = Object.values(categories).map((category) => {
  //   const count = recipes.filter((r) => r.category === category.name).length;
  //   return { ...category, count };
  // });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ⚠️ SEO 최적화 안됨: header 태그 미사용 */}
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          카테고리
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          원하는 카테고리를 선택하여 레시피를 탐색해보세요
        </p>
      </header>

      {/* ⚠️ SEO 최적화 안됨: section 태그 미사용 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryList.map((category) => (
            <article key={category.name}>
              <Link
                href={`/categories/${encodeURIComponent(category.name)}`}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 block"
                aria-label={`${category.name} 카테고리로 이동 (${category.count}개 레시피)`}
              >
                <div className="text-5xl mb-4 text-center">{category.icon}</div>
                <h2 className="font-display text-2xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
                  {category.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                  {category.description}
                </p>
                <p className="text-center text-blue-600 dark:text-blue-400 font-semibold">
                  {category.count}개 레시피
                </p>
              </Link>
            </article>
            // <Link
            //   key={category.name}
            //   href={`/categories/${encodeURIComponent(category.name)}`}
            //   className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105"
            // >
            //   <div className="text-5xl mb-4 text-center">{category.icon}</div>
            //   <h2 className="font-display text-2xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
            //     {category.name}
            //   </h2>
            //   <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
            //     {category.description}
            //   </p>
            //   <div className="text-center text-blue-600 dark:text-blue-400 font-semibold">
            //     {category.count}개 레시피
            //   </div>
            // </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
