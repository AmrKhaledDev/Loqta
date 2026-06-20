"use client";

import { formatCurrency } from "@/lib/formates/formatCurrency";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// ========================================================
function RegionSalesChart({
  regionSalesData,
}: {
  regionSalesData: {
    name: string;
    value: number;
  }[];
}) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl text-center font-semibold">
        المدن الأعلى في الشراء
      </h2>
      <div className="bg-white/5 ring ring-gray-50/10 p-5 rounded-2xl shadow w-full h-120">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regionSalesData}>
            <CartesianGrid
              stroke="#d4d4d4a7"
              strokeDasharray="2 2"
              vertical={false}
            />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="orange" />
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} fontWeight={500} />
            <Tooltip
              formatter={(value) => [
                `${formatCurrency.format(Number(value))}`,
                "الشراء",
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

export default RegionSalesChart;
