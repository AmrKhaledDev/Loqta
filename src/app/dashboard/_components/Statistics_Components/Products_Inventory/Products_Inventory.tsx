"use client";

import { StagnantProduct, TopProductType } from "@/lib/types/types";
import KpiCards from "./_components/KpiCards";
import TopProducts from "./_components/TopProducts";
import StagnantProducts from "./_components/StagnantProducts/StagnantProducts";
// =============================================================================
function Products_Inventory({
  totalInventory,
  productsLowStock,
  productOutOfStock,
  topProducts,
  stagnantProducts,
}: {
  totalInventory: number;
  productsLowStock: number;
  productOutOfStock: number;
  topProducts: TopProductType[];
  stagnantProducts: StagnantProduct[];
}) {
  return (
    <>
      <KpiCards
        totalInventory={totalInventory}
        productsLowStock={productsLowStock}
        productOutOfStock={productOutOfStock}
      />
      <TopProducts topProducts={topProducts} />
      <StagnantProducts stagnantProducts={stagnantProducts} />
    </>
  );
}

export default Products_Inventory;
