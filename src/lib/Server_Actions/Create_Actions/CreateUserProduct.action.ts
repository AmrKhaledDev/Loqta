"use server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
// ====================================================
export const CreateUserProductAction = async (
  userId: string,
  productId: string,
  quantity: number = 1,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!userId || !productId)
      return { success: false, message: "بيانات ناقصة" };
    const [user, product] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, emailVerified: true, role: true },
      }),
      prisma.product.findUnique({
        where: { id: productId },
        select: {
          id: true,
          stock: true,
          price: true,
          isOnSale: true,
          discountPrice: true,
          isDeleted: true,
        },
      }),
    ]);
    if (!user) return { success: false, message: "برجاء تسجيل الدخول أولاً" };
    if (!product) return { success: false, message: "المنتج غير موجود" };
    if (!user.emailVerified)
      return { success: false, message: "برجاء تفعيل حسابك أولاً" };
    if (user.role === "ADMIN")
      return {
        success: false,
        message:
          "عذراً، الحسابات الإدارية مخصصة لإدارة المنصة فقط ولا يمكنها إجراء عمليات شراء أو إضافة منتجات.",
      };
    if (product.isDeleted)
      return {
        success: false,
        message: "تم حذف هذا المنتج من المتجر لا يمكنك إضافته",
      };
    if (product.stock < quantity)
      return {
        success: false,
        message: "الكمية المطلوبة غير متوفرة في المخزن",
      };
    const existingItem = await prisma.userProduct.findFirst({
      where: {
        userId,
        productId,
        status: "IN_CART",
      },
    });
    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        return {
          success: false,
          message: "عذراً، لقد وصلت للحد الأقصى المتاح في المخزن",
        };
      }
      await prisma.userProduct.update({
        where: { id: existingItem.id },
        data: {
          quantity: { increment: quantity },
          priceAtAdd: product.discountPrice
            ? product.discountPrice
            : product.price,
        },
      });
    } else {
      await prisma.userProduct.create({
        data: {
          userId,
          productId,
          quantity,
          priceAtAdd: product.discountPrice
            ? product.discountPrice
            : product.price,
        },
      });
    }
    revalidateTag("users", "");
    return {
      success: true,
      message: existingItem
        ? "تم زيادة كمية هذا المنتج الموجود لديك "
        : "تم إضافة المنتج إلى العربة",
    };
  } catch (error) {
    console.error("Cart Error:", error);
    return { success: false, message: "حدث خطأ غير متوقع" };
  }
};
