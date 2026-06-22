"use client";

import { formatCurrency } from "@/lib/formates/formatCurrency";
import { MapPin } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashWarnMessage from "../../../DashWarnMessage";
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
      <h2 className="sm:text-3xl text-2xl font-extrabold justify-center flex items-center gap-3">
        <MapPin className="sm:size-13 size-11 p-2 rounded-full shadow bg-green-50 text-green-400" />{" "}
        المدن الأعلى في الشراء
      </h2>
      {regionSalesData.length > 0 ? (
        <div className="w-full overflow-x-auto rounded-2xl shadow bg-white p-5 ">
          <div className="w-full min-w-250 md:h-130 h-110 ">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionSalesData}>
                <CartesianGrid
                  stroke="#d4d4d4a7"
                  strokeDasharray="2 2"
                  vertical={false}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="orange" />
                <XAxis
                  dataKey="name"
                  axisLine={{
                    stroke: "rgba(226, 232, 240, 0.4)",
                  }}
                />
                <YAxis
                  fontWeight={600}
                  axisLine={{
                    stroke: "rgba(226, 232, 240, 0.4)",
                  }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${formatCurrency.format(Number(value))}`,
                    "الشراء",
                  ]}
                  contentStyle={{
                    borderRadius: "10px",
                    backgroundColor: "black",
                  }}
                  itemStyle={{
                    color: "white",
                    fontWeight: "600",
                  }}
                  labelStyle={{
                    color: "orange",
                    fontWeight: "800",
                  }}
                  cursor={{
                    fill: "rgba(226, 232, 240, 0.3)",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <DashWarnMessage message="حالياً لا يوجد أي مبيعات" />
      )}
    </div>
  );
}

export default RegionSalesChart;
