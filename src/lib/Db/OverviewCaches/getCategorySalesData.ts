import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ====================================
export const getCategorySalesData = Cache(
  async () => {
    const ordersDelivereds = await prisma.order.findMany({
      where: {
        status: "DELIVERED",
        isCanceled: false,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    const salesData: Record<string, number> = {};
    for (const order of ordersDelivereds)
      for (const item of order.items) {
        const categoryName = item.product.category.name;
        const itemPrice = item.priceAtAdd * item.quantity;
        if (!salesData[categoryName]) salesData[categoryName] = 0;
        salesData[categoryName] += itemPrice;
      }
    return Object.keys(salesData)
      .map((name) => ({
        name,
        value: salesData[name],
      }))
      .sort((a, b) => b.value - a.value);
  },

  ["categorySalesData"],
  { revalidate: 3600 },
);
