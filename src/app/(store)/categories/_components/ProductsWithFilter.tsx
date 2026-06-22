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
  useEffect(() => {
    setShuffledProducts(shuffleArray(products));
  }, [products]);
  const [shuffledProducts, setShuffledProducts] =
    useState<ProductDbType[]>(products);
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
