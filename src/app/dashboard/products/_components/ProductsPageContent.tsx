"use client";
import { useEffect, useState } from "react";
import DashSectionHead from "../../_components/DashSectionHead/DashSectionHead";
import { CategoryDbType, ProductDbType } from "@/lib/types";
import SearchBar from "../../_components/SearchBar/SearchBar";
import ProductsGrid from "./ProductsGrid/ProductsGrid";
import ProductModal from "./ProductModal/ProductModal";
import axios from "axios";
import ProductLoading from "./ProductLoading";
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
  const [dataSearch, setDataSearch] = useState<ProductDbType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"edit" | "create" | null>(null);
  const [product, setProduct] = useState<ProductDbType | null>(null);
  useEffect(() => {
    const FETCH_DATA = async () => {
      if (!search.trim() || search.length < 1) return;
      setLoading(true);
      const data: ProductDbType[] | { error: string } = (
        await axios.get(`/api/products_search?q=${search}`)
      ).data;
      setLoading(false);
      if ("error" in data) return setError(data.error);
      setDataSearch(data);
    };
    FETCH_DATA();
  }, [search]);
  const productsList = search && dataSearch ? dataSearch : products;
  return (
    <>
      <DashSectionHead
        title="إدارة المنتجات"
        buttonName="إضافة منتج جديد"
        setAction={setActionType}
        setItem={setProduct}
      />
      <SearchBar value={search} setValue={setSearch} error={error} />
      {loading ? <ProductLoading /> : <ProductsGrid products={productsList} />}
      {actionType !== null && (
        <ProductModal
          actionType={actionType}
          setActionType={setActionType}
          categories={categories}
        />
      )}
    </>
  );
}

export default ProductsPageContent;
