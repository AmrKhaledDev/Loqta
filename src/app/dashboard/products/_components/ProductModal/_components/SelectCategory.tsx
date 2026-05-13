"use client";

import { CategoryDbType } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =====================================================================
function SelectCategory({
  setShowSelector,
  categoryId,
  showSelector,
  setCategoryId,
  categories,
}: {
  setShowSelector: Dispatch<SetStateAction<boolean>>;
  categoryId:string;
  showSelector: boolean;
  setCategoryId: Dispatch<SetStateAction<string>>;
  categories: CategoryDbType[];
}) {
  const category = categories.find(cat=>cat.id === categoryId)
  return (
    <div className="w-fit">
      <div
        onClick={() => setShowSelector(!showSelector)}
        className="flex items-center justify-between w-90 py-2 rounded-full cursor-pointer ring ring-cyan-500 px-4 bg-white/10 shadow"
      >
        <h2 className={`${category ? "text-white" : "text-slate-300 "}`}>
          {category ? category.name : "أختر صنف"}
        </h2>
        <ChevronDown className="text-slate-300" />
      </div>
      {showSelector && (
        <div className="bg-white/10 p-2 max-h-40 overflow-y-auto rounded-xl ring ring-gray-50/30 mt-2 flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              type="button"
              onClick={() => {
                setCategoryId(cat.id);
                setShowSelector(false);
              }}
              key={cat.id}
              className={`hover:bg-cyan-500 shadow button rounded-md hover:scale-103 text-sm text-start px-3 mytransition py-1.5 cursor-pointer 
                ${cat.id === categoryId && "bg-cyan-500 scale-103"} `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectCategory;
