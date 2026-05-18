import z from "zod";
// ============================================
export const CreateProductSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty({ message: "إسم المنتج مطلوب" })
      .min(5, { message: "إسم المنتج قصير للغاية" })
      .max(70, { message: "إسم المنتج طويل للغاية" }),
    price: z.string().trim().nonempty({ message: "سعر المنتج مطلوب" }),
    stock: z
      .string()
      .trim()
      .nonempty({ message: "كمية المنتج المخزنة لا يمكن تركها فارغة" }),
    minStock: z.string().trim().nonempty({ message: "أقل كمية مخزنة مطلوبة" }),
    returnPolicy: z.string().nullable().optional(),
    warranty: z.string().nullable().optional(),
    shippingInfo: z.string().nullable().optional(),
    description: z
      .string()
      .trim()
      .nonempty({ message: "يجب كتابة وصف لهذا المنتج" })
      .min(20, { message: "الوصف قصير للغاية" })
      .max(500, { message: "الوصف طويل للغاية" }),
    categoryId: z.string().trim().nonempty({ message: "يجب عليك إختيار صنف " }),
    discountPrice: z.string().nullable().optional(),
    isOnSale: z.boolean(),
    brandLogoImage: z.string().optional().nullable(),
    brandLogoLink: z.string().optional().nullable(),
    brandWebsite: z.string().optional().nullable(),
    primaryImage: z
      .string({ message: "يجب رفع صورة للمنتج" })
      .trim()
      .nonempty({ message: "يجب رفع صورة للمنتج" }),
    image1: z.string().optional().nullable(),
    image2: z.string().optional().nullable(),
    image3: z.string().optional().nullable(),
    brandLogoIsImage: z.boolean(),
    primaryImageFile: z.any().nullable().optional(),
    image1File: z.any().nullable().optional(),
    image2File: z.any().nullable().optional(),
    image3File: z.any().nullable().optional(),
    brandLogoFile: z.any().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isOnSale == true && !data.discountPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "يجب كتابة السعر بعد الخصم",
        path: ["discountPrice"],
      });
    }
  })
  .superRefine((data, ctx) => {
    if (data.brandLogoIsImage == true && data.brandLogoLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "لا يمكنك رفع الشعار من الجهاز مع الرابط في نفس الوقت",
        path: ["brandLogoLink"],
      });
    }
  });
