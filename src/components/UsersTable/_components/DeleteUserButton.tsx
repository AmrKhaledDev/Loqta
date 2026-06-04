import { useState } from "react";
import TdTable from "./TdTable";
import { toast } from "react-toastify";
import { DeleteUserAction } from "@/lib/Server_Actions/Delete/DeleteUser.action";
// =================================================
function DeleteUserButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await DeleteUserAction(userId);
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      toast.success(result.message, { className: "toast-font" });
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حذف المستخدم / المسؤول حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TdTable>
      <button
        disabled={loading}
        onClick={handleDelete}
        className={`mytransition text-red-300 text-sm ring ring-red-900/50 py-1 px-3 rounded-lg
          ${loading ?"text-red-500" :"bg-red-950/80 hover:scale-103 active:scale-95 hover:shadow-2xl hover:ring-red-900/40 hover:bg-red-950/50 "}
          `}
      >
       {loading?"جاري الحذف . . .":" حذف"}
      </button>
    </TdTable>
  );
}

export default DeleteUserButton;
