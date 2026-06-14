import { prisma } from "@/lib/prisma";
import { Cache } from "@/lib/Cache/Cache";
import { StagnantProduct } from "@/lib/types/types";
// ========================================
export const getStagnantProducts = Cache(
  async () => {
    const date = new Date();
    date.setDate(date.getDate() - 20);
    const stagnantProducts: StagnantProduct[] = await prisma.product.findMany({
      where: {
        salesCount: {
          lte: 1,
        },
        createdAt: {
          lt: date,
        },
      },
      orderBy: {
        salesCount: "asc",
      },
      take: 15,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        productImages: true,
        createdAt: true,
        salesCount: true,
      },
    });
    return stagnantProducts;
  },
  ["stagnantProducts"],
  {
    revalidate: 3600,
    tags: ["stagnantProducts"],
  },
);
