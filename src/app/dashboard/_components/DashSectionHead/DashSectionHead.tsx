import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ====================================
function DashSectionHead({
  setAction,
  setCategory,
}: {
  setAction: Dispatch<SetStateAction<"edit" | "create" | null>>;
  setCategory: Dispatch<SetStateAction<Category | null>>;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-black text-3xl">إدارة الأصناف</h2>
      <button
        onClick={() => {
          setAction("create");
          setCategory(null);
        }}
        className="flex items-center gap-1 cursor-pointer hover:scale-105 mytransition bgg-ip text-sm py-2 px-4 rounded-full shadow font-bold"
      >
        إضافة صنف جديد <Plus strokeWidth={2.7} className="size-5 pt-0.5" />
      </button>
    </div>
  );
}

export default DashSectionHead;
