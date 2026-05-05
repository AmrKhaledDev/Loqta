"use client";
import { ProductDbType } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
// ===================================================
function ProductQuantity({
  setQuantity,
  quantity,
  product,
}: {
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
  product: ProductDbType;
}) {
  return (
    <div className="flex items-center gap-3">
      <h2>الكمية :</h2>
      <div className="flex items-center gap-2">
        <Plus
          onClick={() => {
            if (quantity >= product.stock)
              return toast.error("وصلت للحد الأقصى في زيادة الكمية", {
                className: "toast-font",
              });
            setQuantity((prev) =>
              prev >= product.stock ? product.stock : (prev += 1),
            );
          }}
          className="ring cursor-pointer mytransition hover:scale-105 active:scale-95 ring-gray-50/20 bg-white/5 rounded p-1"
        />
        <span className="select-none">{quantity}</span>
        <Minus
          onClick={() => setQuantity((prev) => (prev == 1 ? 1 : prev - 1))}
          className="ring cursor-pointer mytransition hover:scale-105 active:scale-95 ring-gray-50/20 bg-white/5 rounded p-1"
        />
      </div>
    </div>
  );
}

export default ProductQuantity;
