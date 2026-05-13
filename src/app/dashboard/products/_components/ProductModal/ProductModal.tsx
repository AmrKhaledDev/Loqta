"use client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProductModalFormField from "./_components/ProductModalFormField";
import { CategoryDbType, ProductDbType } from "@/lib/types";
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
  product,
}: {
  actionType: "edit" | "create" | null;
  setActionType: Dispatch<SetStateAction<"edit" | "create" | null>>;
  categories: CategoryDbType[];
  product?: ProductDbType | null;
}) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(String(product?.price) || "");
  const [stock, setStock] = useState(String(product?.stock) || "");
  const [minStock, setMinStock] = useState(String(product?.min_stock) || "");
  const [returnPolicy, setReturnPolicy] = useState(product?.returnPolicy || "");
  const [warranty, setWarranty] = useState(product?.warranty || "");
  const [shippingInfo, setShippingInfo] = useState(product?.warranty || "");
  const [description, setDescription] = useState(product?.description || "");
  const [discountPrice, setDiscountPrice] = useState(
    String(product?.discountPrice) || "",
  );
  const [logoBrandLink, setLogoBrandLink] = useState(product?.brandLogo || "");
  const [brandWebsite, setBrandWebsite] = useState(product?.brandWebsite || "");
  // ====
  const [isLogoLink, setIsLogoLink] = useState(
    product?.brandLogo ? true : false || false,
  );
  const [isOnSale, setIsOnSale] = useState(product?.isOnSale || false);
  const [isOriginal, setIsOriginal] = useState<boolean | null>(
    product?.isOriginal || null,
  );
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);
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
            setCategoryId={setCategoryId}
            setShowSelector={setShowSelector}
            showSelector={showSelector}
            categories={categories}
            categoryId={categoryId}
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
            label={actionType === "edit" ? "تعديل المنتج" : "إنشاء منتج جديد"}
            textColor="text-cyan-500"
            Icon={Plus}
            loading={loading}
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
