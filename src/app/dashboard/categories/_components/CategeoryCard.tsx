"use client";
import { CategoryDbType } from "@/lib/types/types";
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
  const activeProducts = category.products.filter(
    (product) => product.isDeleted === false,
  );
  const categoryInfos = [
    {
      id: "category_name",
      label: "إسم الصنف",
      value: category.name,
    },
    {
      id: "category_products",
      label: "عدد المنتجات",
      value: activeProducts.length,
    },
    {
      id: "category_history",
      label: "تاريخ الإنشاء",
      value: dayjs(category.createdAt).format("D/M/YYYY"),
    },
  ];
  return (
    <li className="ring ring-gray-50/20 p-4 hover:-translate-y-1 hover:scale-101 mytransition overflow-hidden relative bg-white/5 rounded-2xl flex flex-col items-center gap-2">
      {categoryInfos.map((info) => (
        <h2
          key={info.id}
          className="flex items-center gap-2 text-gray-400 font-normal"
        >
          {info.label}
          <span className="font-black text-white">{info.value}</span>
        </h2>
      ))}
      <span className="w-full h-px bg-white/5 rounded-full" />
      <button
        onClick={() => {
          setAction("edit");
          setCategoryEdit(category);
        }}
        className="bg-white/5 ring ring-gray-50/10 shadow w-full py-3 mt-1 cursor-pointer rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 mytransition font-semibold"
      >
        تعديل الصنف
      </button>
    </li>
  );
}

export default CategeoryCard;
