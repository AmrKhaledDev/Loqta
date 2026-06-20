import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ====================================
export const getRegionSalesData = Cache(
  async () => {
    const ordersDelivered = await prisma.order.findMany({
      where: {
        status: "DELIVERED",
      },
    });
    const regionSalesMap: Record<string, number> = {};
    for (const order of ordersDelivered) {
      const regionName = order.city || "غير محدد";
      if (!regionSalesMap[order.city]) regionSalesMap[order.city] = 0;
      regionSalesMap[regionName] += order.totalPrice;
    }
    return Object.keys(regionSalesMap)
      .map((name) => ({
        name,
        value: regionSalesMap[name],
      }))
      .sort((a, b) => b.value - a.value);
  },
  ["regionSalesData"],
  {
    revalidate: 3600,
    tags: ["regionSalesData"],
  },
);
