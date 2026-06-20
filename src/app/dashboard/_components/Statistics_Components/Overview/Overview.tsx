"use client";

import { formatCurrency } from "@/lib/formates/formatCurrency";
import KPI_Cards from "./_components/KPI_Cards";
import RevenueChart from "./_components/RevenueChart";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// ========================================================================
function Overview({
  totalSales,
  ordersCount,
  newCustomers,
  activeProducts,
  monthlyRevenueData,
  categorySalesData,
}: {
  totalSales: number;
  ordersCount: number;
  newCustomers: number;
  activeProducts: number;
  monthlyRevenueData: { month: string; revenue: number }[];
  categorySalesData: { name: string; value: number }[];
}) {
  const COLORS = [
    "#06b6d4",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
  ];
  const year = new Date().getFullYear();
  return (
    <>
      <KPI_Cards
        totalSales={totalSales}
        ordersCount={ordersCount}
        newCustomers={newCustomers}
        activeProducts={activeProducts}
      />
      <RevenueChart chartData={monthlyRevenueData} />
      <div>
        <h2 className="text-center text-4xl text-slate-200 font-semibold flex items-center gap-2 justify-center">
          أكثر الأصناف مبيعاً
        </h2>
        <div className="w-full h-150 flex items-center justify-center ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  textAlign: "right",
                }}
                formatter={(value) => [
                  `${formatCurrency.format(Number(value))}`,
                  "المبيعات",
                ]}
              />
              <Pie
                data={categorySalesData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={250}
                paddingAngle={4}
                dataKey="value"
              >
                {categorySalesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-300 hover:opacity-80 outline-none"
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={35}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-slate-300 font-medium mx-2">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Overview;
