"use client";

import { CategoryDbType } from "@/lib/types/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
// =====================================================================
function SelectCategory({
  categories,
  categoryId,
  setValue,
}: {
  categories: CategoryDbType[];
  categoryId: string;
  setValue: any;
}) {
  const [dropDown, setDropDown] = useState(false);
  const category = categories.find((cat) => cat.id === categoryId);
  return (
    <div className="w-fit">
      <div className="flex flex-col gap-2">
        <button type="button"
          onClick={() => setDropDown(!dropDown)}
          className="flex items-center justify-between w-90 py-2 rounded-full cursor-pointer ring ring-cyan-500 px-4 bg-white/10 shadow"
        >
          <h2 className={`${category ? "text-slate-100 " : "text-slate-300 "}`}>
            {category ? category.name : "إختر صنف"}
          </h2>
          <ChevronDown
            className={`text-slate-300 ${dropDown && "rotate-180"} mytransition`}
          />
        </button>
      </div>
      {dropDown && (
        <motion.div
          initial={{ opacity: 0, }}
          whileInView={{ opacity: 1, }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 p-2 max-h-40 overflow-y-auto rounded-xl ring ring-gray-50/30 mt-2 flex flex-col gap-1"
        >
          {categories.map((cat) => (
            <button
              onClick={() => {
                setValue("categoryId", cat.id);
                setDropDown(false);
              }}
              type="button"
              key={cat.id}
              className={`hover:bg-cyan-500 shadow button rounded-md hover:scale-103 text-sm text-start px-3 mytransition py-1.5 cursor-pointer 
                ${cat.id === categoryId && "bg-cyan-500 scale-103"} `}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default SelectCategory;

