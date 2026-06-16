import { prisma } from "@/lib/prisma";
import { Cache } from "../../Cache/Cache";
// ============================================
export const getOrders = Cache(
  async () => {
    const orders = await prisma.order.findMany({
      orderBy: {
        order_num:"asc"
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                productImages: true,
              },
            },
          },
        },
      },
    });
    return orders;
  },
  ["orders"],
  { revalidate: 3600, tags: ["orders"] },
);
