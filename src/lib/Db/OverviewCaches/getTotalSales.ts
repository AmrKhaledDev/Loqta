import { Cache } from "../../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ====================================================
export const getTotalSales = Cache(
  async () => {
    const salesData = await prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: "DELIVERED",
      },
    });
    return salesData._sum.totalPrice || 0;
  },
  ["totalSales"],
  {
    revalidate: 3600,
    tags: ["totalSales"],
  },
);
