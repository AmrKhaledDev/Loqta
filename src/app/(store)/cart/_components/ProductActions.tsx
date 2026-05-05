"use client";
import { DeleteUserProductAction } from "@/lib/Server_Actions/Delete/DeleteUserProduct.action";
import { QtyProductAction } from "@/lib/Server_Actions/Edit/QtyProduct.action";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
// ========================================================
function ProductActions({
  quantity,
  productId,
}: {
  quantity: number;
  productId: string;
}) {
  const router = useRouter();
  const [productAcLoading, setProductAcLoading] = useState(false);
  const Qty = async (type: "increment" | "decrement") => {
    setProductAcLoading(true);
    const result = await QtyProductAction(productId, type);
    setProductAcLoading(false);
    if (!result.success) return;
    router.refresh();
  };
  const deleteProduct = async () => {
    setProductAcLoading(true);
    const result = await DeleteUserProductAction(productId);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <button
          disabled={productAcLoading}
          onClick={() => {
            Qty("decrement");
          }}
          className="btnQty"
        >
          <Minus />
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          disabled={productAcLoading}
          onClick={() => {
            Qty("increment");
          }}
          className="btnQty"
        >
          <Plus />
        </button>
      </div>
      <button
        className="size-8 flex items-center justify-center bg-red-500 cursor-pointer hover:scale-103 active:scale-97 rounded-full p-2 shadow"
        onClick={deleteProduct}
        disabled={productAcLoading}
      >
        <Trash2 />
      </button>
    </div>
  );
}

export default ProductActions;
