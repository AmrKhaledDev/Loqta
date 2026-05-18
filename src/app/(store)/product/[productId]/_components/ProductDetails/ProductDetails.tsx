"use client";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import ProductImage from "./_components/ProductImage";
import ProductQuantity from "./_components/ProductQuantity";
import { CreateUserProductAction } from "@/lib/Server_Actions/Create_Actions/CreateUserProduct.action";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ProductInfo from "./_components/ProductInfo";
import ProductImages from "./_components/ProductImages";
import ProductBrand from "./_components/ProductBrand";
import { ProductDbType, UserSessionWithRelations } from "@/lib/types/types";
// ===============================================================
function ProductDetails({
  product,
  userSession,
}: {
  product: ProductDbType;
  userSession: UserSessionWithRelations | null;
}) {
  const [productImage, setProductImage] = useState(
    product.productImages[0].image,
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const existingItem = userSession?.userProducts.find(
    (p) => p.productId === product.id,
  );
  const handle = async () => {
    if (!userSession) return redirect("/login");
    setLoading(true);
    const result = await CreateUserProductAction(
      userSession.id,
      product.id,
      quantity,
    );
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div className="ring ring-gray-50/20 bg-white/5 p-5 rounded-2xl gap-4 min-h-100 flex flex-col">
      {existingItem && <BadgeCheck className="size-8 text-green-400 animate-pulse"/>}
      <div className="flex justify-between gap-6">
        <div className="flex gap-2">
          {product.productImages.length > 1 && (
            <ProductImages
              product={product}
              setProductImage={setProductImage}
            />
          )}
          <ProductImage image={productImage} />
        </div>
        <div className="flex-1 flex flex-col gap-10 justify-between">
          <div className="flex flex-col gap-2.5">
            <ProductBrand product={product} />
            <ProductInfo product={product} />
            {!existingItem && product.stock > 0 && (
              <ProductQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                product={product}
              />
            )}
          </div>
          {product.stock < 1 && (
            <p className="text-red-50 font-semibold text-center bg-red-500 py-2">
              نفذت الكمية
            </p>
          )}
          {!existingItem && product.stock > 0 && (
            <button
              disabled={loading}
              onClick={handle}
              className="py-2 not-disabled:bgg-ip disabled:bg-gray-100 select-none rounded not-disabled:cursor-pointer flex items-center gap-2 justify-center font-semibold"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  أضف الى العربة <ShoppingBag />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
