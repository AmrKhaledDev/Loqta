"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteProductAction } from "@/lib/Server_Actions/Delete/DeleteProduct.action";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
// =======================================================
function ButtonDeleteProduct({
  setActionType,
  productId,
}: {
  setActionType: Dispatch<SetStateAction<null | "create" | "edit" | null>>;
  productId: string;
}) {
  const [loading, setLoading] = useState(false);
  const handleDeleteProduct = async () => {
    try {
      setLoading(true);
      const result = await DeleteProductAction(productId);
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      toast.success(result.message, { className: "toast-font" });
    } catch (error) {
      console.log(error);
      return toast.error("عذراً حدث خطأ أثناء حذف المنتج", {
        className: "toast-font",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          onClick={() => {
            setActionType(null);
          }}
          className="bg-red-100 button py-2 px-6 rounded-md shadow hover:scale-105 mytransition active:scale-95 cursor-pointer font-bold text-red-500"
        >
          حذف المنتج
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">
            هل أنت متأكد من هذا الإجراء ؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            تنبيه : أنت على وشك حذف المنتج نهائياً من المتجر ولن تستطيع إلغاء
            الإجراء بعد الحذف يرجى التأكد من تنفيذ هذا الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:scale-102 mytransition active:scale-98"
            disabled={loading}
            onClick={handleDeleteProduct}
          >
            {loading ? "برجاء الإنتظار . . ." : "حذف المنتج"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ButtonDeleteProduct;
