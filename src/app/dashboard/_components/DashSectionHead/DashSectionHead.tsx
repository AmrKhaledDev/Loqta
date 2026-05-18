import { ProductDbType } from "@/lib/types/types";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ====================================
function DashSectionHead({
  setAction,
  title,
  buttonName,
  setItem,
}: {
  setAction: Dispatch<SetStateAction<"edit" | "create" | null>>;
  setItem:
    | Dispatch<SetStateAction<ProductDbType | null>>
    | Dispatch<SetStateAction<Category | null>>;
  title: string;
  buttonName: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-black text-3xl">{title}</h2>
      <button
        onClick={() => {
          setAction("create");
          setItem(null)
        }}
        className="flex items-center button gap-1 cursor-pointer hover:scale-105 mytransition bgg-ip text-sm py-2 px-4 rounded-full shadow font-bold"
      >
        {buttonName} <Plus strokeWidth={2.7} className="size-5 pt-0.5" />
      </button>
    </div>
  );
}

export default DashSectionHead;
