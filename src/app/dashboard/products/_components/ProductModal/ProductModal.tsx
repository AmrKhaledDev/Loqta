"use client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProductModalFormField from "./_components/ProductModalFormField";
import { CategoryDbType } from "@/lib/types";
import { CreateProductInputs } from "@/lib/data/CreateProductInputs";
import ModalHead from "./_components/ModalHead";
import ProductImages from "./_components/ProductImages";
import SelectCategory from "./_components/SelectCategory";
import CheckBox from "./_components/CheckBox";
import IsOnSale from "./_components/IsOnSale";
import BrandInfo from "./_components/BrandInfo";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
// =======================================================
function ProductModal({
  actionType,
  setActionType,
  categories,
}: {
  actionType: "edit" | "create" | null;
  setActionType: Dispatch<SetStateAction<"edit" | "create" | null>>;
  categories: CategoryDbType[];
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [minStock, setMinStock] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [warranty, setWarranty] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const [description, setDescription] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [logoBrandLink, setLogoBrandLink] = useState("");
  const [brandWebsite, setBrandWebsite] = useState("");
  // ====
  const [isLogoLink, setIsLogoLink] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isOriginal, setIsOriginal] = useState<boolean | null>(null);
  const [category, setCategory] = useState<CategoryDbType | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [loading,setLoading] = useState(false)
  const inputs = CreateProductInputs({
    name,
    setName,

    price,
    setPrice,

    stock,
    setStock,

    minStock,
    setMinStock,

    returnPolicy,
    setReturnPolicy,

    warranty,
    setWarranty,

    shippingInfo,
    setShippingInfo,

    description,
    setDescription,
  });
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
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-60 flex items-center justify-center">
      <div className="bg-white/20 boxCreateProduct flex flex-col gap-10 h-170 overflow-y-auto w-250 ring ring-gray-50/40 rounded-2xl p-5">
        <ModalHead actionType={actionType} setActionType={setActionType} />
        <ProductImages />
        <form className="flex flex-col gap-3">
          {inputs.map((field: any) => (
            <ProductModalFormField
              key={field.id}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              typeField={field.typeField}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
          <SelectCategory
            setCategory={setCategory}
            setShowSelector={setShowSelector}
            showSelector={showSelector}
            categories={categories}
            category={category}
          />
          <IsOnSale
            value={discountPrice}
            onChange={setDiscountPrice}
            isOnSale={isOnSale}
            setIsOnSale={setIsOnSale}
          />
          <div className="flex items-center gap-2">
            <CheckBox
              label="المنتج أصلي"
              state={isOriginal}
              setState={setIsOriginal}
            />
          </div>
          <BrandInfo
            logoValue={logoBrandLink}
            setLogoValue={setLogoBrandLink}
            isLogoLink={isLogoLink}
            websiteValue={brandWebsite}
            setWebsiteValue={setBrandWebsite}
            setIsLogoLink={setIsLogoLink}
          />
        
          <FloatingIconButton
            bgColor="bg-cyan-500"
            label="إنشاء منتج جديد"
            textColor="text-cyan-500"
            Icon={Plus}
            loading={loading}
            loadingText="جاري الإنشاء . . ."
          />
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
