"use client";

import { DeleteUserOpinionInDashAction } from "@/lib/Server_Actions/Delete/DeleteUserOpinionInDash.action";
import { OpinionDBType } from "@/lib/types/types";
import { useState } from "react";
import { toast } from "react-toastify";
// ===============================================================
function ButtonDeleteOpinion({ opinion }: { opinion: OpinionDBType }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const result = await DeleteUserOpinionInDashAction(opinion.id);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message, { className: "toast-font" });
  };
  return (
    <button
      disabled={loading}
      onClick={handleDelete}
      className="not-disabled:active:scale-95 mytransition text-xs not-disabled:hover:scale-102 text-red-500 ring ring-red-500 py-2 rounded-md not-disabled:cursor-pointer disabled:text-gray-400 font-semibold"
    >
      {loading ? "جاري الحذف . . ." : " حذف هذا التقييم"}
    </button>
  );
}

export default ButtonDeleteOpinion;
