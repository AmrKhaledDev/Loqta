"use client";

import { useEffect, useState } from "react";
import FilterButtons from "./FilterButtons";
import Products from "@/components/Products/Products";
import { ProductDbType } from "@/lib/types/types";
import { Category, User } from "@prisma/client";
// ==============================================================
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
function ProductsWithFilter({
  products,
  categories,
  userSession,
}: {
  products: ProductDbType[];
  categories: Category[];
  userSession: User | null;
}) {
  const [shuffledProducts, setShuffledProducts] =
    useState<ProductDbType[]>(products);
  useEffect(() => {
    const savedProducts = sessionStorage.getItem("my_shuffled_products_ids");
    if (savedProducts) {
      const idsProducts = JSON.parse(savedProducts) as String[];
      const currentShuffledProducts = [...products].sort(
        (a, b) => idsProducts.indexOf(a.id) - idsProducts.indexOf(b.id),
      );
      setShuffledProducts(currentShuffledProducts);
    } else {
      const shuffleProducts = shuffleArray(products);
      const idsShuffledProducts = shuffleProducts.map((p) => p.id);
      sessionStorage.setItem(
        "my_shuffled_products_ids",
        JSON.stringify(idsShuffledProducts),
      );
      setShuffledProducts(shuffleProducts);
    }
  }, [products]);
  const [category, setCategory] = useState("all");
  const filteredProducts =
    category === "all"
      ? shuffledProducts
      : shuffledProducts.filter((p) => p.category.id === category);
  return (
    <>
      <FilterButtons
        categories={categories}
        setCategory={setCategory}
        category={category}
      />

      <Products products={filteredProducts} userSession={userSession} />
    </>
  );
}

export default ProductsWithFilter;
