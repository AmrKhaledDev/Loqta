import { prisma } from "@/lib/prisma";
import { Cache } from "../../Cache/Cache";
// =========================================
export const getActiveProductsCount = Cache(
  async () => {
    const activeProductsCount = await prisma.product.count({
      where: {
        isDeleted: false,
        stock: {
          gte: 1,
        },
      },
    });
    return activeProductsCount;
  },
  ["activeProductsCount"],
  {
    revalidate: 3600,
    tags: ["activeProductsCount"],
  },
);
