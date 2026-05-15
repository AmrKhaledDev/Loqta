"use client";
import { Plus } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ProductModalFormField from "./_components/ProductModalFormField";
import { CategoryDbType, ProductDbType, ProductModalErrors } from "@/lib/types";
import { CreateProductInputs } from "@/lib/data/CreateProductInputs";
import ModalHead from "./_components/ModalHead";
import ProductImages from "./_components/ProductImages";
import SelectCategory from "./_components/SelectCategory";
import CheckBox from "./_components/CheckBox";
import IsOnSale from "./_components/IsOnSale";
import BrandInfo from "./_components/BrandInfo/BrandInfo";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
import { CreateProductSchema } from "@/lib/Zod_Schemas/CreateProduct.schema";
import { upload } from "@/lib/upload";
import { toast } from "react-toastify";
import { CreateProductAction } from "@/lib/Server_Actions/Create_Actions/CreateProduct.action";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [errors, setErrors] = useState<ProductModalErrors>({});
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(
    product?.price ? String(product.price) : "",
  );
  const [stock, setStock] = useState(
    product?.stock ? String(product?.stock) : "",
  );
  const [minStock, setMinStock] = useState(
    product?.min_stock ? String(product?.min_stock) : "",
  );
  const [returnPolicy, setReturnPolicy] = useState(product?.returnPolicy || "");
  const [warranty, setWarranty] = useState(product?.warranty || "");
  const [shippingInfo, setShippingInfo] = useState(product?.shippingInfo || "");
  const [description, setDescription] = useState(product?.description || "");
  const [discountPrice, setDiscountPrice] = useState(
    product?.discountPrice ? String(product.discountPrice) : "",
  );
  const [isOnSale, setIsOnSale] = useState(product?.isOnSale || false);
  const [brandLogo, setBrandLogo] = useState(
    product?.brandLogoIsImage ? "" : product?.brandLogo || "",
  );
  const [brandWebsite, setBrandWebsite] = useState(product?.brandWebsite || "");
  // Images States =========================================================================
  const [primaryImagePrev, setPrimaryImagePrev] = useState(
    product?.productImages?.[0]?.image || "",
  );
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [image1Prev, setImage1Prev] = useState(
    product?.productImages?.[1]?.image || "",
  );
  const [image1File, setImage1File] = useState<File | null>(null);
  const [image2Prev, setImage2Prev] = useState(
    product?.productImages?.[2]?.image || "",
  );
  const [image2File, setImage2File] = useState<File | null>(null);
  const [image3Prev, setImage3Prev] = useState(
    product?.productImages?.[3]?.image || "",
  );
  const [image3File, setImage3File] = useState<File | null>(null);
  const [brandLogoPrev, setBrandLogoPrev] = useState(
    product?.brandLogoIsImage && product.brandLogo ? product?.brandLogo : "",
  );
  const [brandLogoFile, setBrandLogoFile] = useState<File | null>(null);
  // Images States =========================================================================
  const [isLogoLink, setIsLogoLink] = useState(
    product?.brandLogoIsImage ? false : true || false,
  );
  const [isOriginal, setIsOriginal] = useState<boolean | null>(
    product?.isOriginal || null,
  );
  const [categoryId, setCategoryId] = useState(
    product?.categoryId || categories[0].id,
  );
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputs = CreateProductInputs({
    name,
    setName,
    nameError: errors.name,
    price,
    setPrice,
    priceError: errors.price,
    stock,
    setStock,
    stockError: errors.stock,
    minStock,
    setMinStock,
    minStockError: errors.minStock,
    returnPolicy,
    setReturnPolicy,
    warranty,
    setWarranty,
    shippingInfo,
    setShippingInfo,
    description,
    setDescription,
    descriptionError: errors.description,
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
  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (brandLogo && brandLogoPrev)
        return toast.error(
          "لا يمكنك إضافة لوجو من الجهاز مع رابط  في نفس الوقت",
          { className: "toast-font" },
        );
      setLoading(true);
      setErrors({});
      const validation = CreateProductSchema.safeParse({
        name,
        price,
        stock,
        minStock,
        description,
        categoryId,
        primaryImage: primaryImagePrev,
        discountPrice,
        isOnSale,
        isOriginal,
        brandLogo,
        brandWebsite,
        returnPolicy,
        warranty,
        shippingInfo,
        brandLogoIsImage: brandLogoFile ? true : false,
      });
      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0],
          price: fieldErrors.price?.[0],
          stock: fieldErrors.stock?.[0],
          minStock: fieldErrors.minStock?.[0],
          primaryImage: fieldErrors.primaryImage?.[0],
          description: fieldErrors.description?.[0],
          categoryId: fieldErrors.categoryId?.[0],
        });
        return;
      }
      if (isOnSale && !discountPrice)
        return setErrors({ discountPrice: "برجاء كتابة السعر بعد الخصم" });
      if (discountPrice && Number(discountPrice) > Number(price))
        return setErrors({
          discountPrice:
            "لا يمكن أن يكون السعر بعد الخصم اكبر من السعر قبل الخصم",
        });
      if (!primaryImageFile)
        return setErrors({ primaryImage: "برجاء رفع صورة لهذا المنتج" });
      const primaryImage: { error: string } | { url: string } =
        await upload(primaryImageFile);
      if ("error" in primaryImage)
        return setErrors({ primaryImage: primaryImage.error });
      let image1: { error: string } | { url: string } | null = null;
      if (image1File) {
        image1 = await upload(image1File);
        if (image1 && "error" in image1)
          return toast.error("فشل رفع أول صورة مصغرة للمنتج");
      }
      let image2: { error: string } | { url: string } | null = null;
      if (image2File) {
        image2 = await upload(image2File);
        if (image2 && "error" in image2)
          return toast.error("فشل رفع ثاني صورة مصغرة للمنتج");
      }
      let image3: { error: string } | { url: string } | null = null;
      if (image3File) {
        image3 = await upload(image3File);
        if (image3 && "error" in image3)
          return toast.error("فشل رفع ثالث صورة مصغرة للمنتج");
      }
      let brandLogoImage: null | { error: string } | { url: string } = null;
      if (brandLogoFile) {
        brandLogoImage = await upload(brandLogoFile);
        if (brandLogoImage && "error" in brandLogoImage)
          return toast.error(brandLogoImage.error, { className: "toast-font" });
      }
      const result = await CreateProductAction({
        name,
        description,
        price,
        categoryId,
        isOnSale,
        isOriginal,
        returnPolicy,
        shippingInfo,
        stock,
        minStock,
        discountPrice,
        primaryImage: primaryImage?.url || primaryImagePrev,
        brandLogo: brandLogoImage ? brandLogoImage.url : brandLogo || "",
        brandWebsite,
        image1: image1?.url || image1Prev,
        image2: image2?.url || image2Prev,
        image3: image3?.url || image3Prev,
        brandLogoIsImage: brandLogoPrev ? true : false,
      });
      if (!result.success)
        return toast.error(result.message, { className: "toast-font" });
      if (!product) {
        setPrimaryImagePrev("");
        setImage1Prev("");
        setImage2Prev("");
        setImage3Prev("");
        setName("");
        setDescription("");
        setPrice("");
        setDiscountPrice("");
        setIsOnSale(false);
        setBrandLogo("");
        setBrandWebsite("");
        setStock("");
        setMinStock("");
        setWarranty("");
        setReturnPolicy("");
        setShippingInfo("");
        setBrandLogoPrev("");
      }
      setPrimaryImageFile(null);
      setImage1File(null);
      setImage2File(null);
      setImage3File(null);
      setBrandLogoFile(null);
      router.refresh();
      toast.success(result.message, { className: "toast-font" });
    } catch (error) {
      console.log(error);
      setErrors({ serverError: "حدث خطأ أثناء إنشاء منتج جديد" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-60 flex items-center justify-center">
      <div className="bg-white/20 boxCreateProduct flex flex-col gap-10 h-170 overflow-y-auto w-250 ring ring-gray-50/40 rounded-2xl p-5">
        <ModalHead actionType={actionType} setActionType={setActionType} />
        <ProductImages
          primaryImagePrev={primaryImagePrev}
          setPrimaryImagePrev={setPrimaryImagePrev}
          setPrimaryImageFile={setPrimaryImageFile}
          image1Prev={image1Prev}
          setImage1Prev={setImage1Prev}
          setImage1File={setImage1File}
          image2Prev={image2Prev}
          setImage2Prev={setImage2Prev}
          setImage2File={setImage2File}
          image3Prev={image3Prev}
          setImage3Prev={setImage3Prev}
          setImage3File={setImage3File}
          primaryImageError={errors.primaryImage}
        />
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-3">
          {inputs.map((field) => (
            <ProductModalFormField
              key={field.id}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              typeField={field.typeField}
              value={field.value}
              onChange={field.onChange}
              error={field.error}
            />
          ))}
          <SelectCategory
            setCategoryId={setCategoryId}
            setShowSelector={setShowSelector}
            showSelector={showSelector}
            categories={categories}
            categoryId={categoryId}
            error={errors.categoryId}
          />
          <IsOnSale
            value={discountPrice}
            onChange={setDiscountPrice}
            isOnSale={isOnSale}
            setIsOnSale={setIsOnSale}
            error={errors.discountPrice}
          />
          <div className="flex items-center gap-2">
            <CheckBox
              label="المنتج أصلي"
              state={isOriginal}
              setState={setIsOriginal}
            />
          </div>
          <BrandInfo
            logoValue={brandLogo}
            setLogoValue={setBrandLogo}
            isLogoLink={isLogoLink}
            websiteValue={brandWebsite}
            setWebsiteValue={setBrandWebsite}
            setIsLogoLink={setIsLogoLink}
            brandLogoPrev={brandLogoPrev}
            setBrandLogoFile={setBrandLogoFile}
            setBrandLogoPrev={setBrandLogoPrev}
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