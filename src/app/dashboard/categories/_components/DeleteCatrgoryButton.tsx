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
// ============================================
function DeleteCatrgoryButton({
  handle,
  loading,
}: {
  handle: () => Promise<void>;
  loading: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full py-3 rounded-2xl flex items-center justify-center shadow cursor-pointer hover:translate-y-1 mytransition bg-red-500 font-semibold">
          حذف هذا الصنف
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">
            هل أنت متأكد من هذا الإجراء ؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            تنبيه: أنت على وشك حذف هذا الصنف نهائياً. يرجى العلم أن هذا الإجراء
            سيؤدي إلى إزالة الصنف من المتجر، ,وسيتم إزالة المنتجات المرتبطة به.
            لا يمكن التراجع عن هذه الخطوة بعد إتمامها.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:scale-102 mytransition active:scale-98"
            onClick={handle}
            disabled={loading}
          >
            {loading ? "برجاء الإنتظار . . ." : "حذف هذا الصنف"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCatrgoryButton;
