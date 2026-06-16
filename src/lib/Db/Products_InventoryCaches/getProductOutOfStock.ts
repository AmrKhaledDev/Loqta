import { prisma } from "@/lib/prisma";
import { Cache } from "@/lib/Cache/Cache";
// ==========================================
export const getProductOutOfStock = Cache(
  async () => {
    const productsCount = await prisma.product.count({
      where: {
        isDeleted: false,
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
