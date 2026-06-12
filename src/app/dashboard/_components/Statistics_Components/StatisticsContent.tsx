"use client";
import { useState } from "react";
import Tabs from "./Tabs";
import Overview from "./Overview/Overview";
// ================================================================================
function StatisticsContent({
  totalSales,
  ordersCount,
  newCustomers,
  activeProducts,
}: {
  totalSales: number;
  ordersCount: number;
  newCustomers: number;
  activeProducts: number;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "overview" && (
        <Overview
          totalSales={totalSales}
          ordersCount={ordersCount}
          newCustomers={newCustomers}
          activeProducts={activeProducts}
        />
      )}
    </>
  );
}

export default StatisticsContent;
