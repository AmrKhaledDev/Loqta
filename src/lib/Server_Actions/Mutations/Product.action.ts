"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { CreateProductSchema } from "@/lib/Zod_Schemas/Create_Schemas/CreateProduct.schema";
import { revalidateTag } from "next/cache";
import z from "zod";
// =========================================
export const ProductAction = async (
  data: z.infer<typeof CreateProductSchema>,
  type: "EDIT" | "CREATE",
  productId?: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const userSession = await GetUserSession();
    if (
      !userSession ||
      userSession.role == "USER" ||
      userSession.role === "SELLER"
    )
      return { success: false, message: "ليس لديك صلاحية إنشاء منتج" };
    const validation = CreateProductSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const {
      name,
      description,
      isOnSale,
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
      brandLogoImage,
      brandLogoLink,
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
    const productData = {
      name,
      description,
      categoryId,
      warranty,
      returnPolicy,
      stock: parseFloat(stock),
      min_stock: parseFloat(minStock),
      isOnSale: isOnSale,
      price: parseFloat(price),
      brandLogoImage,
      brandLogoLink,
      brandWebsite,
      shippingInfo,
      discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      brandLogoIsImage: brandLogoIsImage,
    };
    if (type === "CREATE" && !productId) {
      await prisma.$transaction(async (tx) => {
        await tx.product.create({
          data: {
            ...productData,
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
    }
    if (type === "EDIT" && productId) {
      await prisma.$transaction(async (tx) => {
        await tx.product.update({
          where: {
            id: productId,
          },
          data: {
            ...productData,
            productImages: {
              deleteMany: {},
              createMany: {
                data: filteredImages.map((image) => ({
                  image,
                })),
              },
            },
          },
        });
      });
    }
    revalidateTag("getCategorysOffers", "");
    revalidateTag("categoriesDash", "");
    revalidateTag("categories", "");
    revalidateTag("products", "");
    revalidateTag("activeProductsCount", "");
    revalidateTag("inventoryStats", "");
    revalidateTag("productsLowStock", "");
    revalidateTag("productOutOfStock", "");
    return {
      success: true,
      message: productId ? "تم تعديل المنتج" : "تم إنشاء منتج جديد بنجاح",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: productId
        ? "حدث خطأ أثناء تعديل المنتج"
        : "حدث خطأ أثناء إنشاء منتج جديد",
    };
  }
};
