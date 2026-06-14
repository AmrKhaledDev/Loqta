import { prisma } from "@/lib/prisma";
import { Cache } from "../Cache/Cache";
// ==========================================
export const getProductOutOfStock = Cache(
  async () => {
    const productsCount = await prisma.product.count({
      where: {
        stock: {
          lte: 0,
        },
      },
    });
    return productsCount;
  },
  ["productOutOfStock"],
  {
    revalidate: 3600,
    tags: ["productOutOfStock"],
  },
);
