import { prisma } from "@/lib/prisma";
import { Cache } from "../Cache/Cache";
// ==========================================
export const getProductsLowStock = Cache(
  async () => {
    const productsCount = await prisma.product.count({
      where: {
        stock: {
          gt: 0,
          lte: prisma.product.fields.min_stock,
        },
      },
    });
    return productsCount;
  },
  ["productsLowStock"],
  {
    revalidate: 3600,
    tags: ["productsLowStock"],
  },
);
