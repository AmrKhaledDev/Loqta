"use client";

import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

function UsersGrowthDataChart({
  usersCrowthData,
}: {
  usersCrowthData: {
    month: string;
    value: number;
  }[];
}) {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-10">
      <h2 className="flex items-center gap-3 justify-center sm:text-3xl text-2xl font-extrabold">
        <TrendingUp className="sm:size-13 size-11 p-2 bg-indigo-50 shadow rounded-full text-indigo-500" />
        معدل نمو الحسابات
      </h2>
      <div className="w-full overflow-x-auto rounded-2xl shadow bg-white p-5 ">
        <div className="w-full min-w-250 md:h-130 h-110 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usersCrowthData}>
              <CartesianGrid
                strokeDasharray="2 2"
                strokeOpacity={0.4}
                vertical={false}
              />
              <XAxis
                dataKey="month"
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
              <Bar dataKey="value" fill="orange" radius={[10, 10, 0, 0]} />
              <Tooltip
                formatter={(value) => [`${value}`, "مستخدمين"]}
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
    </div>
  );
}

export default UsersGrowthDataChart;
