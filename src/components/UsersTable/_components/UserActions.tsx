import { useState } from "react";
import TdTable from "../../TdTable/TdTable";
import { toast } from "react-toastify";
import { DeleteUserAction } from "@/lib/Server_Actions/Delete/DeleteUser.action";
import { User } from "@prisma/client";
import { ActivationAction } from "@/lib/Server_Actions/Mutations/Activation.action";
// =================================================
function UserActions({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const [activationLoading, setActivationLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await DeleteUserAction(user.id);
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
  const handleActivation = async () => {
    setActivationLoading(true);
    const result = await ActivationAction(
      user.id,
      user.emailVerified ? "deactivation" : "active",
    );
    setActivationLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message, { className: "toast-font" });
  };
  return (
    <TdTable>
      <button
        disabled={loading}
        onClick={handleDelete}
        className={`mytransition text-red-300 lg:text-sm text-xs ring ring-red-900/50 py-1 px-3 rounded-lg
          ${loading ? "text-red-500" : "bg-red-950/80 hover:scale-103 active:scale-95 hover:shadow-2xl hover:ring-red-900/40 hover:bg-red-950/50 "}
          `}
      >
        {loading ? "جاري الحذف . . ." : " حذف"}
      </button>

      <button
        disabled={activationLoading}
        onClick={handleActivation}
        className={`mytransition ${user.emailVerified ? "bg-red-950/80 ring-red-900/50 text-red-300" : "bg-green-950/80 ring-green-900/50 text-green-300"} lg:text-sm text-xs ring  lg:mr-2 mr-1 py-1 px-3 rounded-lg  hover:scale-103 active:scale-95 hover:shadow-2xl hover:ring-green-900/40 `}
      >
        {user.emailVerified
          ? activationLoading
            ? "جاري الإلغاء . . ."
            : "إلغاء تفعيل"
          : activationLoading
            ? "جاري التفعيل . . ."
            : "تفعيل"}
      </button>
    </TdTable>
  );
}

export default UserActions;
