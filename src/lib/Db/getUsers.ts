import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ===============================================
export const getUsers = Cache(
  async () => {
    const data = await prisma.user.findMany({
      where: {
        role: {
          in: ["USER", "SELLER"],
        },
      },
      include: {
        orders: {
          where: { status: "DELIVERED" },
          select: { totalPrice: true },
        },
        userProducts: {
          where: { status: "IN_CART" },
        },
        _count: {
          select: { orders: true },
        },
      },
      orderBy: { createdAt: "asc" },
      take: 10,
    });
    return data;
  },
  ["users"],
  { revalidate: 3600, tags: ["users"] },
);
