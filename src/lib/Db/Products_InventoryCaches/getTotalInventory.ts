import { prisma } from "@/lib/prisma";
import { Cache } from "@/lib/Cache/Cache";
// ==============================
export const getTotalInventory = Cache(
  async () => {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false,
        stock: {
          gte: 1,
        },
      },
      select: { stock: true, price: true },
    });
    const totalInventoryValue = products.reduce(
      (acc, product) => acc + product.stock * product.price,
      0,
    );
    return totalInventoryValue;
  },
  ["inventoryStats"],
  {
    revalidate: 3600,
    tags: ["inventoryStats"],
  },
);
