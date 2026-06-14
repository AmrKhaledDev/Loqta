import { prisma } from "@/lib/prisma";
import { Cache } from "../Cache/Cache";
import { TopProductType } from "../types/types";
// ==========================================
export const getTopProducts = Cache(
  async () => {
    const completedOrders = await prisma.order.findMany({
      where: {
        status: "DELIVERED",
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                productImages: true,
                name: true,
              },
            },
          },
        },
      },
    });
    const productsSalesMap: Record<string, TopProductType> = {};
    completedOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (!item.product) return;
        if (!productsSalesMap[item.productId]) {
          productsSalesMap[item.productId] = {
            id: item.productId,
            product: item.product,
            totalQty: 0,
            totalRevenue: 0,
          };
        }
        productsSalesMap[item.productId].totalQty += item.quantity;
        productsSalesMap[item.productId].totalRevenue +=
          item.quantity * item.priceAtAdd
      });
    });
    const topProducts = Object.values(productsSalesMap)
      .sort((a, b) => b.totalQty - a.totalQty)
      .slice(0, 5);
    return topProducts;
  },
  ["topProducts"],
  {
    revalidate: 3600,
    tags: ["topProducts"],
  },
);
