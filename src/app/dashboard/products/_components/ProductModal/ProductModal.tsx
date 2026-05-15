"use client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import ProductModalFormField from "./_components/ProductModalFormField";
import { CategoryDbType } from "@/lib/types";
import { CreateProductInputs } from "@/lib/data/CreateProductInputs";
import ModalHead from "./_components/ModalHead";
import ProductImages from "./_components/ProductImages";
import SelectCategory from "./_components/SelectCategory";
import CheckBox from "./_components/CheckBox";
import IsOnSale from "./_components/IsOnSale";
import BrandInfo from "./_components/BrandInfo/BrandInfo";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
// ================================================================================================
function ProductModal({
  actionType,
  setActionType,
  categories,
}: {
  actionType: "edit" | "create" | null;
  setActionType: Dispatch<SetStateAction<"edit" | "create" | null>>;
  categories: CategoryDbType[];
}) {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .boxCreateProduct"))
          setActionType(null);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  const inputs = CreateProductInputs();
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-60 flex items-center justify-center">
      <div className="bg-white/20 boxCreateProduct flex flex-col gap-10 h-170 overflow-y-auto w-250 ring ring-gray-50/40 rounded-2xl p-5">
        <ModalHead actionType={actionType} setActionType={setActionType} />
        <ProductImages />
        <form className="flex flex-col gap-3">
          {inputs.map((field) => (
            <ProductModalFormField
              key={field.id}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              typeField={field.typeField}
            />
          ))}
          <SelectCategory categories={categories} />
          <IsOnSale />
          <CheckBox label="المنتج أصلي" />
          <BrandInfo />
          <FloatingIconButton
            bgColor="bg-cyan-500"
            label={actionType === "edit" ? "تعديل المنتج" : "إنشاء منتج جديد"}
            textColor="text-cyan-500"
            Icon={Plus}
            loadingText={
              actionType === "edit"
                ? "جاري تعديل المنتج . . ."
                : "جاري الإنشاء . . ."
            }
          />
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
