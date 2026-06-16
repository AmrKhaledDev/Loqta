"use server";
import { ORDER_STATUS_MAP } from "@/lib/data/OrderStatusMap";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { revalidateTag } from "next/cache";
// ========================================
export const EditOrderStatusAction = async (
  ordId: string,
  newStatus: OrderStatus,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!ordId) return { success: false, message: "يتعذر تغيير حالة الطلب" };
    const currentOrder = await prisma.order.findUnique({
      where: {
        id: ordId,
      },
      select: {
        status: true,
        items: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
            productId: true,
            quantity: true,
          },
        },
        isCanceled: true,
        order_num: true,
      },
    });
    if (!currentOrder)
      return {
        success: false,
        message: "يتعذر تغيير حالة الطلب (الطلب غير موجود)",
      };
    if (currentOrder.isCanceled)
      return {
        success: false,
        message: "لا يمكنك تغيير حالة هذا الطلب بسبب أنه تم حذف منتجاته",
      };
    const oldStatus = currentOrder.status;
    const activeStatus: OrderStatus[] = [
      "PENDING",
      "DELIVERED",
      "CONFIRMED",
      "SHIPPED",
    ];
    const cancelledStatus: OrderStatus[] = [
      "NO_ANSWER",
      "REFUNDED",
      "CANCELLED",
    ];
    await prisma.$transaction(async (tx) => {
      if (
        activeStatus.includes(oldStatus) &&
        cancelledStatus.includes(newStatus)
      ) {
        for (const item of currentOrder.items) {
          await tx.product.update({
            where: {
              id: item.productId,
            },
            data: {
              stock: {
                increment: item.quantity,
              },
              salesCount: {
                decrement: 1,
              },
            },
          });
        }
      }

      if (
        cancelledStatus.includes(oldStatus) &&
        activeStatus.includes(newStatus)
      ) {
        for (const item of currentOrder.items) {
          const updateProduct = await tx.product.updateMany({
            where: {
              id: item.productId,
              stock: {
                gte: item.quantity,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
              salesCount: {
                increment: 1,
              },
            },
          });
          if (updateProduct.count === 0)
            throw new Error(
              `المنتج (${item.product.name}) الكميه المخزنه فيه غير كافيه `,
            );
          continue;
        }
      }

      await tx.order.update({
        where: {
          id: ordId,
        },
        data: {
          status: newStatus,
        },
      });
    });
    revalidateTag("orders", "");
    revalidateTag("products", "");
    revalidateTag("ordersCount", "");
    revalidateTag("totalSales", "");
    revalidateTag("inventoryStats", "");
    revalidateTag("productsLowStock", "");
    revalidateTag("productOutOfStock", "");
    revalidateTag("topProducts", "");
    revalidateTag("stagnantProducts", "");
    revalidateTag("accountsWithoutPurchases", "");
    revalidateTag("activeCustomers", "");
    return {
      success: true,
      message: `تم تعديل حالة طلب رقم ${currentOrder.order_num} من ${ORDER_STATUS_MAP[oldStatus].label} إلى ${ORDER_STATUS_MAP[newStatus].label}`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "حدث خطأ أثناء تعديل حالة الطلب حاول مرة أخرى",
    };
  }
};
