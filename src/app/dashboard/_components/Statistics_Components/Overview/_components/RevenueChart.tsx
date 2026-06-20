"use client";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// ======================================================================================================
export default function RevenueChart({
  chartData,
}: {
  chartData: { month: string; revenue: number }[];
}) {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-center lg:text-4xl sm:text-3xl text-2xl text-slate-200 font-semibold flex items-center gap-2 justify-center">
        أرباح عام
        <span className="font-extrabold text-cyan-500">( {year} )</span>
      </h2>
    <div className="bg-white/5 ring ring-gray-50/10 p-5 rounded-2xl shadow w-full h-120">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              stroke="#d4d4d4a7"
              strokeDasharray="2 2"
              vertical={false}
            />
            <Bar dataKey="revenue" radius={[10, 10, 0, 0]} fill="orange" />
            <XAxis dataKey="month" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} fontWeight={700} />
            <Tooltip
              formatter={(value) => [
                `${formatCurrency.format(Number(value))}`,
                "الأرباح",
              ]}
              labelStyle={{
                color: "orange",
                fontWeight: "bold",
              }}
              itemStyle={{
                color: "black",
                fontWeight: "bold",
              }}
              contentStyle={{
                borderRadius: "20px",
                boxShadow: "0px 0px 5px rgba(82, 82, 82, 0.577)",
              }}
              cursor={{
                fill: "rgba(226, 232, 240, 0.3)", 
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
