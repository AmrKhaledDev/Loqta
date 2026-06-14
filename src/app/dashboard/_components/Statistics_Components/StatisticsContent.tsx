"use client";
import { useState } from "react";
import Tabs from "./Tabs";
import Overview from "./Overview/Overview";
import Products_Inventory from "./Products_Inventory/Products_Inventory";
import { StagnantProduct, TopProductType } from "@/lib/types/types";
import AudienceAnalytics from "./AudienceAnalytics/AudienceAnalytics";
// ================================================================================
function StatisticsContent({
  // Overview
  totalSales,
  ordersCount,
  newCustomers,
  activeProducts,
  // Products & Inventory
  totalInventory,
  productsLowStock,
  productOutOfStock,
  topProducts,
  stagnantProducts,
  // AudienceAnalytics
  totalAudiences,
  activeCustomers,
  accountsWithoutPurchases,
}: {
  // Overview
  totalSales: number;
  ordersCount: number;
  newCustomers: number;
  activeProducts: number;
  // Products & Inventory
  totalInventory: number;
  productsLowStock: number;
  productOutOfStock: number;
  topProducts: TopProductType[];
  stagnantProducts: StagnantProduct[];
  // AudienceAnalytics
  totalAudiences: number;
  activeCustomers: number;
  accountsWithoutPurchases: number;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <div className="flex flex-col gap-15">
        <h2 className="font-black text-3xl">الإحصائيات</h2>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {activeTab === "overview" && (
        <Overview
          totalSales={totalSales}
          ordersCount={ordersCount}
          newCustomers={newCustomers}
          activeProducts={activeProducts}
        />
      )}
      {activeTab === "products&inventory" && (
        <Products_Inventory
          totalInventory={totalInventory}
          productsLowStock={productsLowStock}
          productOutOfStock={productOutOfStock}
          topProducts={topProducts}
          stagnantProducts={stagnantProducts}
        />
      )}
      {activeTab === "users&behavior" && (
        <AudienceAnalytics
          totalAudiences={totalAudiences}
          activeCustomers={activeCustomers}
          accountsWithoutPurchases={accountsWithoutPurchases}
        />
      )}
    </>
  );
}

export default StatisticsContent;
