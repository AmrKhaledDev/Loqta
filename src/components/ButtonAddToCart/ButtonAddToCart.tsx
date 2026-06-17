"use client";

import Loader from "@/components/Loader/Loader";
import { CreateUserProductAction } from "@/lib/Server_Actions/Create_Actions/CreateUserProduct.action";
import { User } from "@prisma/client";
import { ShoppingBag } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
// =================================================================
function ButtonAddToCart({
  userSession,
  productId,
}: {
  userSession: User | null;
  productId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const AddToCart = async () => {
    if (!userSession) {
      toast.error("سجل الدخول لإضافة المنتج");
      return redirect("/login");
    }
    try {
      setLoading(true);
      const result = await CreateUserProductAction(userSession.id, productId);
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      toast.success(result.message, { className: "toast-font" });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ غير متوقع", { className: "toast-font" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={AddToCart}
      className="flex items-center justify-center not-disabled:cursor-pointer not-disabled:hover:scale-105 mytransition not-disabled:bgg-ip sm:py-2 py-1.5 px-4 rounded-md gap-2 font-semibold text-sm"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <ShoppingBag className="sm:size-4.5 size-4" /> أضف
        </>
      )}
    </button>
  );
}

export default ButtonAddToCart;
