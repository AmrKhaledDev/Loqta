import TopResult from "./TopResult";
import ProductsSuggestions from "./ProductsSuggestions";
import CategoriesSuggestions from "./CategoriesSuggestions";
import { ProductDbType } from "@/lib/types/types";
import { Category } from "@prisma/client";
// ======================================================
function Results({
  products,
  categories,
  search,
}: {
  products: ProductDbType[];
  categories: Category[];
  search: string;
}) {
  return (
    <div className="absolute flex flex-col gap-4 shadow-2xl h-fit rounded-2xl ring ring-gray-400/10 mt-1 overflow-hidden bg-gray-50 w-full text-black">
      <TopResult search={search} />
      {products.length > 0 || categories.length > 0 ? (
        <>
          {products.length > 0 && (
            <span className="w-full h-px bg-white rounded-full block" />
          )}
          <ProductsSuggestions products={products} />
          {categories.length > 0 && (
            <span className="w-full h-px bg-white rounded-full block" />
          )}
          <CategoriesSuggestions categories={categories} />
        </>
      ) : (
        <p className="p-3 text-gray-400 font-normal text-center">
          لا يوجد نتائج لهذا البحث
        </p>
      )}
    </div>
  );
}

export default Results;
