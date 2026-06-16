import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ==========================================
export const getProductsLowStock = Cache(
  async () => {
    const productsCount = await prisma.product.count({
      where: {
        isDeleted:false,
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
