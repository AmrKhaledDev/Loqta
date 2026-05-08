"use client";
import { CategoryDbType } from "@/lib/types";
import { Category } from "@prisma/client";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
// ========================================
function CategeoryCard({
  category,
  setAction,
  setCategoryEdit,
}: {
  category: CategoryDbType;
  setAction: Dispatch<SetStateAction<"edit" | "create" | null>>;
  setCategoryEdit: Dispatch<SetStateAction<Category | null>>;
}) {
  return (
    <li className="ring ring-gray-50/20 hover:-translate-y-2 hover:scale-103 mytransition overflow-hidden pt-10 relative bg-white/5 rounded-2xl flex flex-col items-center gap-2">
      <span className="absolute tracking-widest top-0 -right-1 py-2 px-6 ring ring-gray-50/25 rounded-bl-2xl text-xs font-black bg-white/10">
        {dayjs(category.createdAt).format("D/M/YYYY")}
      </span>
      <h2 className="flex items-center gap-2 text-gray-400 font-normal">
        إسم الصنف :
        <span className="font-black text-white">{category.name}</span>
      </h2>
      <h2 className="flex items-center gap-2 text-gray-400 font-normal">
        عدد المنتجات :
        <span className="font-black text-white">
          {category.products.length}
        </span>
      </h2>
      <span className="w-full h-px bg-gray-50/10 rounded-full" />
      <button
        onClick={() => {
          setAction("edit");
          setCategoryEdit(category);
        }}
        className="bg-white/5 w-full py-3 mt-1 cursor-pointer text-gray-400 hover:text-white hover:bg-white/10 mytransition font-semibold"
      >
        تعديل الصنف
      </button>
    </li>
  );
}

export default CategeoryCard;
