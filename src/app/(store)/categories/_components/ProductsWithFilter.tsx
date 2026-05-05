"use client";

import { useState } from "react";
import FilterButtons from "./FilterButtons";
import Products from "@/components/Products/Products";
import { ProductDbType } from "@/lib/types";
import { Category, User } from "@prisma/client";
// ==============================================================
function ProductsWithFilter({
  products,
  categories,
  userSession,
}: {
  products: ProductDbType[];
  categories: Category[];
  userSession: User | null;
}) {
  const [category, setCategory] = useState("all");
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category.id === category);
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
