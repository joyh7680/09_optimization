"use client";

import { useState } from "react";

import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";
import { Product } from "../types";
import DataFilter from "./DataFilter";
import DataTable from "./DataTable";
import Pagination from "./Pagination";

export default function Products({
  products,
  categories,
  stats,
}: {
  products: Product[];
  categories: Record<string, Record<string, string[]>>;
  stats: {
    totalItems: number;
    totalValue: number;
    avgPrice: number;
    maxPrice: number | undefined;
    minPrice: number | undefined;
    categories: Record<string, number>;
  };
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("전자기기");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 카테고리 선택 및 검색어 기반으로 필터링 되는 데이터
  const filteredData = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "전체" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 필터링된 데이터를 가격 내림차순으로 정렬시킨 데이터
  const sortedData = orderBy(filteredData, ["price"], ["desc"]);
  // 필터링 + 정렬까지 완료된 데이터를 itemsPerPage(한페이지당 아이템 개수) 단위로 나누어 청크로 만든 데이터
  const paginatedData = chunk(sortedData, itemsPerPage);
  // 청크된 데이터 기반으로 현재 페이지에 뿌려줄 실질적인 데이터
  const currentPageData = paginatedData[currentPage - 1] || [];

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* 필터 영역 */}
        <DataFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
        />

        <div className="mt-4 flex gap-2 flex-wrap">
          {Object.entries(stats.categories).map(([cat, count]) => (
            <span
              key={cat}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {cat}: {count}개
            </span>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            상품 목록 ({filteredData.length}개)
          </h2>

          {/* 상품 목록 테이블 */}
          <DataTable currentPageData={currentPageData} />

          {/* 페이지네이션 */}
          <Pagination
            totalPageCount={paginatedData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="전체">전체</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              검색
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="상품명 또는 설명으로 검색..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
