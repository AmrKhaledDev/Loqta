"use client";
import { useEffect, useState } from "react";
import DashSectionHead from "../../_components/DashSectionHead/DashSectionHead";
import { CategoryDbType, ProductDbType } from "@/lib/types/types";
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
  const [editProduct, setEditProduct] = useState<ProductDbType | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [dataSearch, setDataSearch] = useState<ProductDbType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"edit" | "create" | null>(null);
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
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .boxCreateProduct"))
          setActionType(null);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <>
      <DashSectionHead
        title="إدارة المنتجات"
        buttonName="إضافة منتج جديد"
        setAction={setActionType}
        setItem={setEditProduct}
      />
      <SearchBar value={search} setValue={setSearch} error={error} />
      {loading ? (
        <ProductLoading />
      ) : (
        <ProductsGrid
          setEditProduct={setEditProduct}
          setActionType={setActionType}
          products={productsList}
        />
      )}
      {actionType !== null && (
        <ProductModal
          actionType={actionType}
          setActionType={setActionType}
          categories={categories}
          editProduct={editProduct}
        />
      )}
    </>
  );
}

export default ProductsPageContent;
