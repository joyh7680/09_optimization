"use client";

import { useState } from "react";

// ❌ 문제점 1: lodash 전체를 import (트리쉐이킹 X)
// import sumBy from "lodash/sumBy";

// ❌ 문제점 2: 무거운 moment 라이브러리 사용
// import moment from "moment";
// import "moment/locale/ko";
import "dayjs/locale/ko";

import dynamic from "next/dynamic";

// ✅ 로딩 UI 컴포넌트가 없어서 에러나는 경우가 많아서 일단 여기서 정의
function ChartLoadingUI() {
  return (
    <div className="h-96 flex items-center justify-center text-gray-500">
      차트 로딩 중... ???????
    </div>
  );
}

const LineChart = dynamic(() => import("./LineChart"), {
  loading: () => <ChartLoadingUI />,
  ssr: false,
});

const BarChart = dynamic(() => import("./BarChart"), {
  loading: () => <ChartLoadingUI />,
  ssr: false,
});

const PieChart = dynamic(() => import("./PieChart"), {
  loading: () => <ChartLoadingUI />,
  ssr: false,
});

// import LineChart from "./LineChart";
// import BarChart from "./BarChart";
// import PieChart from "./PieChart";

// ❌ 문제점 3: Chart.js와 react-chartjs-2(Chart.js 래핑 라이브러리)를 직접 import (코드 스플리팅 X)
// Chart.js는 약 150KB의 무거운 시각화 라이브러리입니다.
// 직접 import시 해당 페이지를 방문하지 않아도 전체 번들에 포함되어 초기 로딩 속도가 저하될 수 있습니다.

export default function Charts({
  salesData,
}: {
  salesData: {
    month: string;
    sales: number;
    profit: number;
    expenses: number;
  }[];
}) {
  const [selectedChart, setSelectedChart] = useState<"line" | "bar" | "pie">(
    "line"
  );

  return (
    <>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setSelectedChart("line")}
          className={`px-4 py-2 rounded ${
            selectedChart === "line"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          라인 차트
        </button>
        <button
          onClick={() => setSelectedChart("bar")}
          className={`px-4 py-2 rounded ${
            selectedChart === "bar"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          바 차트
        </button>
        <button
          onClick={() => setSelectedChart("pie")}
          className={`px-4 py-2 rounded ${
            selectedChart === "pie"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          파이 차트
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-96">
          {selectedChart === "line" && (
            // <Line data={lineChartData} options={chartOptions} />
            <LineChart salesData={salesData} />
          )}
          {selectedChart === "bar" && (
            // <Bar data={barChartData} options={chartOptions} />
            <BarChart salesData={salesData} />
          )}
          {selectedChart === "pie" && (
            // <Pie data={pieChartData} options={chartOptions} />
            <PieChart salesData={salesData} />
          )}
        </div>
      </div>
    </>
  );
}
