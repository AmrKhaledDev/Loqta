"use client";

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Category } from "@prisma/client";
// ============================================================
function FilterButtons({
  categories,
  category,
  setCategory,
}: {
  categories: Category[];
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  const buttonDesign = (c: string) => {
    return `font-semibold hover:bgg-ip mytransition lg:text-[17px] md:text-[15px] sm:text-sm text-xs bg-black/15 sm:py-3 py-2 sm:px-6 px-4 shadow-xl ring ring-white/5 rounded-2xl 
            ${category === c ? "bgg-ip cursor-default" : "hover:scale-105  active:scale-95 cursor-pointer"}`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="flex items-center justify-center sm:gap-2 gap-1 flex-wrap"
    >
      <button
        title="الكل"
        onClick={() => setCategory("all")}
        className={`${buttonDesign("all")}`}
      >
        الكل
      </button>
      {categories.map((cat) => (
        <button
          title={cat.name}
          onClick={() => setCategory(cat.id)}
          className={`${buttonDesign(cat.id)}`}
          key={cat.name}
        >
          {cat.name}
        </button>
      ))}
    </motion.div>
  );
}

export default FilterButtons;
