"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { CreateProductSchema } from "@/lib/Zod_Schemas/CreateProduct.schema";
import { revalidateTag } from "next/cache";
import z from "zod";
// =========================================
export const CreateProductAction = async (
  data: z.infer<typeof CreateProductSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (!userSession || userSession.role !== "ADMIN")
      return { success: false, message: "ليس لديك صلاحية إنشاء منتج" };
    const validation = CreateProductSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const {
      name,
      description,
      isOnSale,
      isOriginal,
      primaryImage,
      image1,
      image2,
      image3,
      price,
      stock,
      minStock,
      returnPolicy,
      warranty,
      shippingInfo,
      categoryId,
      discountPrice,
      brandLogo,
      brandWebsite,
      brandLogoIsImage,
    } = validation.data;
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: { id: true },
    });
    if (!category)
      return { success: false, message: "الصنف الذي أخترته غير موجود" };
    const images = [primaryImage, image1, image2, image3];
    const filteredImages = images.filter((image): image is string =>
      Boolean(image),
    );
    await prisma.$transaction(async (tx) => {
      await tx.product.create({
        data: {
          name,
          description,
          categoryId,
          warranty,
          returnPolicy,
          stock: parseFloat(stock),
          min_stock: parseFloat(minStock),
          isOnSale: isOnSale,
          price: parseFloat(price),
          brandLogo,
          brandWebsite,
          shippingInfo,
          isOriginal: isOriginal ? true : null,
          discountPrice: discountPrice ? parseFloat(discountPrice) : null,
          brandLogoIsImage: brandLogoIsImage,
          productImages: {
            createMany: {
              data: filteredImages.map((image) => ({
                image,
              })),
            },
          },
        },
      });
    });
    revalidateTag("categoriesDash", "");
    revalidateTag("categories", "");
    revalidateTag("products", "");
    return { success: true, message: "تم إنشاء منتج جديد بنجاح" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "حدث خطأ أثناء إنشاء منتج جديد" };
  }
};
