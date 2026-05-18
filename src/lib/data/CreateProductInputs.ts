import { FieldErrors } from "react-hook-form";

// ========================================================================================
type FieldInputsErrors = FieldErrors<{
    name: string;
    price: string;
    stock: string;
    minStock: string;
    description: string;
    categoryId: string;
    isOnSale: boolean;
    primaryImage: string;
    brandLogoIsImage: boolean;
    returnPolicy?: string | null | undefined;
    warranty?: string | null | undefined;
    shippingInfo?: string | null | undefined;
    discountPrice?: string | null | undefined;
    brandLogo?: string | null | undefined;
    brandWebsite?: string | null | undefined;
    image1?: string | null | undefined;
    image2?: string | null | undefined;
    image3?: string | null | undefined;
    primaryImageFile?: any;
    image1File?: any;
    image2File?: any;
    image3File?: any;
    brandLogoFile?: any;
}>
export const CreateProductInputs = (errors: FieldInputsErrors) => {
  return [
    {
      id: "name",
      label: "إسم المنتج",
      placeholder: "أكتب إسم المنتج",
      type: "text",
      typeField: "input",
      error: errors.name?.message,
    },
    {
      id: "price",
      label: "سعر المنتج",
      placeholder: "أكتب سعر للمنتج",
      type: "number",
      typeField: "input",
      error: errors.price?.message,
    },
    {
      id: "stock",
      label: "كمية المنتج",
      placeholder: "أكتب كمية المنتج المخزنه",
      type: "number",
      typeField: "input",
      error: errors.stock?.message,
    },
    {
      id: "minStock",
      label: "أقل كمية",
      placeholder: "أكتب أقل كمية لهذا المنتج للتنبيه",
      type: "number",
      typeField: "input",
      error: errors.minStock?.message,
    },
    {
      id: "returnPolicy",
      label: "سياسة الإرجاع ( اختياري )",
      placeholder: "أكتب أقصى مدة لإرجاع المنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "warranty",
      label: "الضمان",
      placeholder: "أكتب فترة الضمان الخاصة بالمنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "shippingInfo",
      label: "التوصيل",
      placeholder: "أكتب فترة توصيل المنتج",
      type: "text",
      typeField: "input",
    },
    {
      id: "description",
      label: "الوصف",
      placeholder: "أكتب وصف عن هذا المنتج",
      type: "text",
      typeField: "textarea",
      error: errors.description?.message,
    },
  ];
};
