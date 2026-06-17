"use client";
import Loader from "@/components/Loader/Loader";
import { CategoryAction } from "@/lib/Server_Actions/Mutations/Category.action";
import { Category } from "@prisma/client";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import DashAlertMessage from "../../_components/DashAlertMessage/DashAlertMessage";
import DeleteCatrgoryButton from "./DeleteCatrgoryButton";
import { useRouter } from "next/navigation";
// ========================================================
function CategoryModal({
  actionType,
  setAction,
  category,
}: {
  actionType: "edit" | "create";
  setAction: Dispatch<SetStateAction<"edit" | "create" | null>>;
  category?: Category | null;
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [content, setContent] = useState(category ? category.name : "");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    const result = await CategoryAction(
      actionType,
      content,
      category ? category.id : "",
    );
    setLoading(false);
    if (!result.success) return setError(result.message);
    if (actionType === "create") setContent("");
    setSuccess(result.message);
  };
  const router = useRouter();
  const handleDeleteCategory = async () => {
    setError("");
    setSuccess("");
    if (!category) return;
    setLoadingDelete(true);
    const result = await CategoryAction("delete", "", category.id);
    setLoadingDelete(false);
    if (!result.success) return setError(result.message);
    router.refresh();
    setAction(null)
    setSuccess(result.message);
  };
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur z-60 flex items-center justify-center">
      <div className="bg-white/20 flex flex-col gap-10 w-150 ring ring-gray-50/40 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">
            {actionType === "edit" ? "تعديل الصنف" : "إضافة صنف جديد"}
          </h2>
          <button
            onClick={() => setAction(null)}
            className="cursor-pointer p-2 bg-white/10 hover:bg-white/20 mytransition rounded-full"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              placeholder="اكتب إسم الصنف"
              className="w-full border border-dashed border-gray-50/20 focus:border-gray-50/40 mytransition focus:bg-white/15 cursor-pointer bg-white/5 rounded-2xl py-3 px-6 outline-none"
            />
          </div>
          {error && <DashAlertMessage type="error" message={error} />}
          {success && <DashAlertMessage type="success" message={success} />}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-2xl flex items-center justify-center shadow not-disabled:cursor-pointer not-disabled:hover:translate-y-1 mytransition not-disabled:bg-cyan-500 disabled:bg-gray-400 font-semibold"
          >
            {loading ? <Loader /> : "حفظ الصنف"}
          </button>
          {actionType === "edit" && (
            <DeleteCatrgoryButton
              loading={loadingDelete}
              handle={handleDeleteCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
