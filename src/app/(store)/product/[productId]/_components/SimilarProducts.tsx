import Products from "@/components/Products/Products";
import { ProductDbType } from "@/lib/types/types";
import { User } from "@prisma/client";
// ==========================================================
function SimilarProducts({
  products,
  userSession,
  singleProduct,
}: {
  products: ProductDbType[];
  userSession: User | null;
  singleProduct: ProductDbType;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-xl w-fit">
        منتجات مشابهة <span className="w-1/2 bgg-ip rounded-full block h-[2.5px] mt-0.5" />
      </h2>
      <Products
        singleProduct={singleProduct}
        products={products}
        userSession={userSession}
      />
    </div>
  );
}

export default SimilarProducts;
