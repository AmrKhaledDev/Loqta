"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { Role } from "@prisma/client";
import { revalidateTag } from "next/cache";
// =====================================
export const DeleteProductAction = async (
  productId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const supportedRoles: Role[] = ["ADMIN", "SUPER_ADMIN"];
    const userSession = await GetUserSession();
    if (!userSession)
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء" };
    if (!supportedRoles.includes(userSession.role))
      return { success: false, message: "لا يمكنك تنفيذ هذا الإجراء" };
    if (!productId)
      return {
        success: false,
        message: "حدثت مشكلة غير متوقعة أثناء حذف المنتج",
      };
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: { isDeleted: true, name: true },
    });
    if (!product) return { success: false, message: "هذا المنتج غير موجود" };
    if (product.isDeleted)
      return { success: false, message: "تم حذف هذا المنتج" };
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          isDeleted: true,
        },
      });
      const activeOrders = await tx.order.findMany({
        where: {
          status: {
            notIn: ["DELIVERED", "CANCELLED"],
          },
          items: { some: {} },
        },
        include: {
          items: {
            include: { product: { select: { name: true } } },
          },
        },
      });
      for (const order of activeOrders) {
        const remainingItems = order.items.filter(
          (item) => item.productId !== productId,
        );
        if (remainingItems.length > 0) {
          await tx.userProduct.deleteMany({
            where: {
              orderId: order.id,
              productId,
            },
          });
          const newSubtotal = remainingItems.reduce(
            (sum, item) => (sum + item.priceAtAdd) * item.quantity,
            0,
          );
          const NEW_TAX = newSubtotal * 0.14;
          const SHIPPING = 30;
          const newTotalPrice = newSubtotal + NEW_TAX + SHIPPING;
          await tx.order.update({
            where: {
              id: order.id,
            },
            data: {
              cancelReason: `تم حذف منتج ( ${product.name} ) من فاتورتك بسبب أنه تم حذفه من المتجر`,
              totalPrice: newTotalPrice,
            },
          });
        } else {
          await tx.order.update({
            where: {
              id: order.id,
            },
            data: {
              status: "CANCELLED",
              isCanceled: true,
              cancelReason: `تم إزالة هذا الطلب بسبب أنه تم حذف منتج ( ${product.name} ) من المتجر`,
            },
          });
        }
      }
      await tx.opinion.deleteMany({
        where: {
          productId,
        },
      });
    });
    revalidateTag("activeProductsCount", "");
    revalidateTag("inventoryStats", "");
    revalidateTag("productsLowStock", "");
    revalidateTag("productOutOfStock", "");
    revalidateTag("topProducts", "");
    revalidateTag("stagnantProducts", "");
    revalidateTag("categoriesDash", "");
    revalidateTag("categories", "");
    revalidateTag("getCategorysOffers", "");
    revalidateTag("products", "");
    revalidateTag("opinions", "");
    revalidateTag("orders", "");
    return { success: true, message: "تم حذف المنتج بنجاح" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "عذراً حدث خطأ أثناء حذف المنتج" };
  }
};
