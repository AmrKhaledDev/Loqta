"use client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ProductModalFormField from "./_components/ProductModalFormField";
import { CategoryDbType, ProductDbType } from "@/lib/types/types";
import { CreateProductInputs } from "@/lib/data/CreateProductInputs";
import ModalHead from "./_components/ModalHead";
import ProductImages from "./_components/ProductImages";
import SelectCategory from "./_components/SelectCategory";
import IsOnSale from "./_components/IsOnSale";
import BrandInfo from "./_components/BrandInfo/BrandInfo";
import FloatingIconButton from "@/components/FloatingIconButton/FloatingIconButton";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductSchema } from "@/lib/Zod_Schemas/Create_Schemas/CreateProduct.schema";
import { CreateProductFieldsType } from "@/lib/types/ProductModalTypes/CreateProductFieldsType";
import z from "zod";
import { upload } from "@/lib/upload";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ProductAction } from "@/lib/Server_Actions/Mutations/Product.action";
// ================================================================================================
function ProductModal({
  actionType,
  setActionType,
  categories,
  editProduct,
}: {
  actionType: "edit" | "create" | null;
  setActionType: Dispatch<SetStateAction<"edit" | "create" | null>>;
  categories: CategoryDbType[];
  editProduct?: ProductDbType | null;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: editProduct?.name || "",
      description: editProduct?.description || "",
      isOnSale: editProduct?.isOnSale || false,
      brandWebsite: editProduct?.brandWebsite || "",
      discountPrice: editProduct?.discountPrice
        ? String(editProduct?.discountPrice)
        : "",
      warranty: editProduct?.warranty || "",
      returnPolicy: editProduct?.returnPolicy || "",
      stock: editProduct?.stock ? String(editProduct.stock) : "",
      price: editProduct?.price ? String(editProduct.price) : "",
      minStock: editProduct?.min_stock ? String(editProduct.min_stock) : "",
      shippingInfo: editProduct?.shippingInfo || "",
      categoryId: editProduct?.categoryId || categories?.[0]?.id || "",
      brandLogoIsImage: editProduct?.brandLogoIsImage ?? true,
      //  Prev
      primaryImage: editProduct?.productImages?.[0]?.image || "",
      image1: editProduct?.productImages?.[1]?.image || "",
      image2: editProduct?.productImages?.[2]?.image || "",
      image3: editProduct?.productImages?.[3]?.image || "",
      brandLogoImage: editProduct?.brandLogoImage ?? "",
      brandLogoLink: editProduct?.brandLogoLink ?? "",
      // Files
      primaryImageFile: null,
      image1File: null,
      image2File: null,
      image3File: null,
      brandLogoFile: null,
    },
  });
  const categoryId = watch("categoryId");
  const isOnSale = watch("isOnSale");
  const brandLogoIsImage = watch("brandLogoIsImage");
  const primaryImage = watch("primaryImage");
  const image1 = watch("image1");
  const image2 = watch("image2");
  const image3 = watch("image3");
  const brandLogoImage = watch("brandLogoImage");
  const handleCreateProduct = async (
    data: z.infer<typeof CreateProductSchema>,
  ) => {
    try {
      setLoading(true);
      const {
        primaryImageFile,
        image1File,
        image2File,
        image3File,
        brandLogoFile,
        ...databaseData
      } = data;
      if (!editProduct && !primaryImageFile)
        return setError("primaryImage", {
          type: "manual",
          message: "برجاء رفع صورة للمنتج",
        });
      let urlPrimaryImage: { error: string } | { url: string } | null = null;
      if (primaryImageFile) {
        urlPrimaryImage = await upload(primaryImageFile);
      }
      if (urlPrimaryImage && "error" in urlPrimaryImage)
        return setError("primaryImage", {
          message: urlPrimaryImage.error,
        });
      const files = [
        {
          file: image1File,
          key: "image1",
        },
        {
          file: image2File,
          key: "image2",
        },
        {
          file: image3File,
          key: "image3",
        },
        {
          file: brandLogoFile,
          key: "brandLogo",
        },
      ];
      const results: Record<string, { url: string }> = {};
      for (const item of files) {
        if (!item.file) continue;
        const res = await upload(item.file);
        if ("error" in res) {
          toast.error(res.error);
          continue;
        }
        results[item.key] = res;
      }
      const resultServer = await ProductAction(
        {
          ...databaseData,
          primaryImage: urlPrimaryImage?.url ?? primaryImage,
          image1: results.image1?.url ?? image1,
          image2: results.image2?.url ?? image2,
          image3: results.image3?.url ?? image3,
          brandLogoImage: results.brandLogo?.url ?? brandLogoImage,
        },
        editProduct ? "EDIT" : "CREATE",
        editProduct?.id || "",
      );
      if (!resultServer.success)
        return toast.error(resultServer.message, { className: "toast-font" });
      if (!editProduct) reset();
      toast.success(resultServer.message, { className: "toast-font" });
      setActionType(null);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إنشاء منتج جديد", { className: "toast-font" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-xl z-60 flex items-center justify-center">
      <div className="bg-white/20 boxCreateProduct flex flex-col gap-10 h-170 overflow-y-auto w-250 ring ring-gray-50/40 rounded-2xl p-5">
        <ModalHead actionType={actionType} setActionType={setActionType} />
        <ProductImages
          setValue={setValue}
          control={control}
          register={register}
          error={errors.primaryImage?.message}
        />
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="flex flex-col gap-3"
        >
          {CreateProductInputs(errors).map((field) => (
            <ProductModalFormField
              key={field.id}
              id={field.id as Path<CreateProductFieldsType>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              typeField={field.typeField}
              register={register}
              error={field.error}
            />
          ))}
          <SelectCategory
            categoryId={categoryId}
            setValue={setValue}
            categories={categories}
          />
          <IsOnSale
            setValue={setValue}
            register={register}
            isOnSale={isOnSale}
            error={errors.discountPrice?.message}
          />
          <BrandInfo
            brandLogoIsImage={brandLogoIsImage}
            setValue={setValue}
            register={register}
            error={errors.brandLogoImage?.message}
            control={control}
          />
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
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
