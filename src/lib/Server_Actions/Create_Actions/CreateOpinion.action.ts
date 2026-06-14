"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { revalidateTag } from "next/cache";
// ==============================================
export const CreateOpinionAction = async (
  opinion: string,
  productId: string,
  rating: number,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!opinion.trim())
      return { success: false, message: "لا يمكنك ترك رأي فارغ" };
    const userSession = await GetUserSession();
    if (!userSession)
      return { success: false, message: "برجاء تسجيل الدخول لترك رأي" };
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: { id: true },
    });
    if (!product)
      return { success: false, message: "لا يمكنك ترك رأي على منتج غير موجود" };
    await prisma.opinion.create({
      data: {
        userId: userSession.id,
        productId: product.id,
        opinion,
        rating,
      },
    });
    revalidateTag("opinions","")
    revalidateTag("products","")
    return { success: true, message: "تم نشر رأيك الخاص بهذا المنتج" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "حدث خطأ غير متوقع" };
  }
};
