"use server";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { OrderFormSchema } from "@/lib/Zod_Schemas/OrderForm.schema";
import { revalidateTag } from "next/cache";
import z from "zod";
// =========================================
export const CreateOrderAction = async (
  data: z.infer<typeof OrderFormSchema>,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = OrderFormSchema.safeParse(data);
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const { fullName, city, phone, address } = validation.data;
    const userSession = await GetUserSession();
    if (!userSession)
      return { success: false, message: "فشل انشاء طلبك تأكد من تسجيل دخولك" };
    if (!userSession.emailVerified)
      return {
        success: false,
        message: "فشل إنشاء طلبك برجاء تفعيل حسابك أولاً",
      };
    if (userSession.role === "ADMIN")
      return {
        success: false,
        message:
          "عذراً، الحسابات الإدارية مخصصة لإدارة المنصة فقط ولا يمكنها إجراء عمليات شراء أو إضافة منتجات.",
      };
    const userProducts = await prisma.userProduct.findMany({
      where: {
        userId: userSession.id,
        status: "IN_CART",
      },
      select: {
        id: true,
        quantity: true,
        priceAtAdd: true,
        productId: true,
        product: {
          select: {
            name: true,
          },
        },
      },
    });
    if (userProducts.length < 1)
      return {
        success: false,
        message: "برجاء إضافة منتجات إلى السلة أولاً قبل إتمام الطلب",
      };
    const userOrdersPendding = await prisma.order.count({
      where: {
        userId: userSession.id,
        status: {
          in: ["SHIPPED", "PENDING", "CONFIRMED"],
        },
      },
    });
    if (userOrdersPendding >= 2)
      return {
        success: false,
        message: "برجاء إنتظار طلباتك السابقة قبل إتمام طلب جديد",
      };

    if (userProducts.length >= 5)
      return {
        success: false,
        message: "عذراً، الحد الأقصى للمنتجات في الطلب الواحد هو 5 منتجات فقط.",
      };

    const totalQuantity = userProducts.reduce((acc, p) => acc + p.quantity, 0);
    if (totalQuantity > 10)
      return {
        success: false,
        message: "عذراً، لا يمكنك طلب أكثر من 10 قطع في الأوردر الواحد.",
      };
    for (const p of userProducts) {
      if (p.quantity > 2)
        return {
          success: false,
          message: "عذراً لا يمكنك طلب أكثر من قطعتين للمنتج الواحد",
        };
    }
    const subtotal = userProducts.reduce(
      (acc, p) => acc + p.priceAtAdd * p.quantity,
      0,
    );
    const TAX = subtotal * 0.14;
    const SHIPPING = 40;
    const totalPrice = subtotal + TAX + SHIPPING;
    await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: userSession.id,
          city,
          address,
          fullName,
          phone,
          totalPrice,
        },
      });
      const update_userProducts = await tx.userProduct.updateMany({
        where: {
          userId: userSession.id,
          status: "IN_CART",
        },
        data: {
          orderId: newOrder.id,
          status: "ORDERED",
        },
      });
      if (update_userProducts.count === 0)
        throw new Error("حدث خطأ غير متوقع أثناء إتمام طلبك");
      for (const p of userProducts) {
        const updatedProduct = await tx.product.updateMany({
          where: {
            id: p.productId,
            stock: {
              gte: p.quantity,
            },
          },
          data: {
            stock: {
              decrement: p.quantity,
            },
            salesCount: {
              increment: 1,
            },
          },
        });
        if (updatedProduct.count === 0)
          throw new Error(
            `عذراً، المنتج ${p.product.name} نفد أو الكمية غير كافية`,
          );
      }
    });
    revalidateTag("products", "");
    revalidateTag("orders", "");
    revalidateTag("ordersCount", "");
    revalidateTag("totalSales", "");
    revalidateTag("activeProductsCount", "");
    revalidateTag("inventoryStats", "");
    revalidateTag("productsLowStock", "");
    revalidateTag("productOutOfStock", "");
    revalidateTag("topProducts", "");
    revalidateTag("stagnantProducts", "");
    revalidateTag("accountsWithoutPurchases", "");
    revalidateTag("activeCustomers", "");
    revalidateTag("users", "");
    revalidateTag("monthlyRevenueData", "");
    revalidateTag("categorySalesData", "");
    revalidateTag("regionSalesData", "");
    return {
      success: true,
      message: "تم إنشاء طلبك بنجاح سيتم توصيله إليك في أسرع وقت",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "حدث خطأ أثناء انشاء طلبك حاول مرة أخرى",
    };
  }
};
