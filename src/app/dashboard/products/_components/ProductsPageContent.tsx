"use client";
import { useState } from "react";
import DashSectionHead from "../../_components/DashSectionHead/DashSectionHead";
import { CategoryDbType, ProductDbType } from "@/lib/types";
import SearchBar from "../../_components/SearchBar/SearchBar";
import ProductsGrid from "./ProductsGrid/ProductsGrid";
import ProductModal from "./ProductModal/ProductModal";

// =================================================
function ProductsPageContent({
  products,
  categories,
}: {
  products: ProductDbType[];
  categories: CategoryDbType[];
}) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<ProductDbType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"edit" | "create" | null>(null);
  const [product, setProduct] = useState<ProductDbType | null>(null);

  return (
    <>
      <DashSectionHead
        title="إدارة المنتجات"
        buttonName="إضافة منتج جديد"
        setAction={setActionType}
        setItem={setProduct}
      />
      <SearchBar value={search} setValue={setSearch} error={error} />
      <ProductsGrid products={products} />
      {actionType !== null && (
        <ProductModal actionType={actionType} setActionType={setActionType} categories={categories}/>
      )}
    </>
  );
}

export default ProductsPageContent;
