import { ProductDbType } from "@/lib/types/types";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
// ====================================
function DashSectionHead({
  setAction,
  title,
  buttonName,
  setItem,
  categories,
}: {
  setAction: Dispatch<SetStateAction<"edit" | "create" | null>>;
  setItem:
    | Dispatch<SetStateAction<ProductDbType | null>>
    | Dispatch<SetStateAction<Category | null>>;
  title: string;
  buttonName: string;
  categories?: Category[] | [];
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-black text-3xl">{title}</h2>
      <button
        onClick={() => {
          if (categories && categories.length < 1)
            return toast.error("برجاء إضافة أصناف أولاً", {
              className: "toast-font",
            });
          setAction("create");
          setItem(null);
        }}
        className="flex items-center button gap-1 cursor-pointer hover:scale-105 mytransition bgg-ip text-sm py-2 px-4 rounded-full shadow font-bold"
      >
        {buttonName} <Plus strokeWidth={2.7} className="size-5 pt-0.5" />
      </button>
    </div>
  );
}

export default DashSectionHead;
