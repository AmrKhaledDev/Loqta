import { prisma } from "@/lib/prisma";
import { Cache } from "../../Cache/Cache";
// =========================================
export const getOrdersCount = Cache(async () => {
    const ordersCount = await prisma.order.count()
    return ordersCount
}, ["ordersCount"], {
  revalidate: 3600,
  tags: ["ordersCount"],
});
