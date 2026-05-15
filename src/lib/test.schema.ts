import z from "zod";
// ========================================
export const TestProductSchema = z
  .object({
    name: z.string().nonempty({ message: "اسم المنتج مطلوب يا معلم" }),
    price: z.coerce
      .number({ message: "برجاء كتابة السعر كأرقام" })
      .min(1, { message: "السعر يجب أن يكون أكبر من صفر" }),
      
    discountPrice: z.coerce.number().optional().or(z.literal("")),

    stock: z.coerce
      .number({ message: "برجاء كتابة الكمية كأرقام" })
      .min(0, { message: "الكمية لا يمكن أن تكون بالسالب" }),
    minStock: z.coerce
      .number({ message: "برجاء كتابة الحد الأدنى كأرقام" })
      .min(0, { message: "الحد الأدنى لا يمكن أن يكون بالسالب" }),
      
    brandName: z.string().nonempty({ message: "اسم الماركة مطلوب" }),
    brandWebsite: z.string().url({ message: "برجاء كتابة رابط موقع صحيح" }).optional().or(z.literal("")),
    warranty: z.string().optional(),
    shippingInfo: z.string().optional(),
    description: z
      .string()
      .nonempty({ message: "وصف المنتج مطلوب" })
      .min(10, { message: "الوصف مطلوب ولا يقل عن 10 حروف" }),
  })
  .refine((data) => {
    if (data.discountPrice && Number(data.discountPrice) >= Number(data.price)) {
      return false;
    }
    return true;
  }, {
    message: "سعر الخصم لازم يكون أقل من السعر الأساسي يا غالي",
    path: ["discountPrice"],
  });

export type TestProductType = z.infer<typeof TestProductSchema>;