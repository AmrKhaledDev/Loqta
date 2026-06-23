"use client";

import { CategoryDbType } from "@/lib/types/types";
import { Dispatch, SetStateAction } from "react";
// ====================================================
function FilterButtons({
  activeTab,
  setActiveTab,
  categories,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  categories:CategoryDbType[]
}) {
  return (
    <ul className="flex items-center justify-center gap-2">
      <li>
        <button
          onClick={() => setActiveTab("all")}
          className={`${activeTab === "all" ? "bg-cyan-600 scale-105" : "bg-black/20 active:scale-95  hover:scale-102 cursor-pointer "} 
          font-semibold text-sm py-2.5 mytransition px-6 ring ring-gray-50/5 rounded-xl shadow-xl`}
        >
          الكل
        </button>
      </li>
      {categories.map(
        (category) =>
          category.products.length > 0 && (
            <li key={category.id}>
              <button
                onClick={() => setActiveTab(category.id)}
                className={`${activeTab === category.id ? "bg-cyan-600 scale-105" : "bg-black/20 active:scale-95  hover:scale-102 cursor-pointer "} 
          font-semibold text-sm py-2.5 mytransition px-6 ring ring-gray-50/5 rounded-xl shadow-xl`}
              >
                {category.name}
              </button>
            </li>
          ),
      )}
    </ul>
  );
}

export default FilterButtons;
