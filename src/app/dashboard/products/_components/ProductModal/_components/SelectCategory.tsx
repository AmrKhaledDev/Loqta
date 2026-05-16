"use client";

import { CategoryDbType } from "@/lib/types";
import { ChevronDown } from "lucide-react";
// =====================================================================
function SelectCategory({ categories }: { categories: CategoryDbType[] }) {
  return (
    <div className="w-fit">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-90 py-2 rounded-full cursor-pointer ring ring-cyan-500 px-4 bg-white/10 shadow">
          <h2 className={`text-slate-300 `}>أختر صنف</h2>
          <ChevronDown className="text-slate-300" />
        </div>
      </div>
      {/* <div className="bg-white/10 p-2 max-h-40 overflow-y-auto rounded-xl ring ring-gray-50/30 mt-2 flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className={`hover:bg-cyan-500 shadow button rounded-md hover:scale-103 text-sm text-start px-3 mytransition py-1.5 cursor-pointer 
                ${cat.id === categoryId && "bg-cyan-500 scale-103"} `}
            >
              {cat.name}
            </button>
          ))}
        </div> */}
    </div>
  );
}

export default SelectCategory;
