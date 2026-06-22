"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { LayoutGrid } from "lucide-react";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import DashWarnMessage from "../../../DashWarnMessage";
// ================================================================================
function TopCategoriesSales({
  categorySalesData,
}: {
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
  return (
    <div
      className={`${categorySalesData.length < 1 && "flex flex-col gap-10"}`}
    >
      <h2 className="font-extrabold flex items-center justify-center sm:text-3xl text-2xl gap-3">
        <LayoutGrid className="sm:size-13 size-11 p-2 rounded-xl bg-amber-50 shadow text-amber-600" />{" "}
        أكثر الأصناف مبيعاً
      </h2>
      {categorySalesData.length > 0 ? (
        <div className="w-full md:h-150 h-100 flex items-center justify-center ">
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
                outerRadius={"80%"}
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
                layout="horizontal"
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{
                  paddingTop: "20px",
                  width: "100%",
                }}
                formatter={(value) => (
                  <span className="inline-flex text-slate-400 dark:text-slate-300 text-xs md:text-sm mx-2 my-1">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <DashWarnMessage message="حالياً لا يوجد أصناف تم بيعها" />
      )}
    </div>
  );
}

export default TopCategoriesSales;
