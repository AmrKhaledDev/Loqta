import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ======================================
export const getAccountsWithoutPurchases = Cache(
  async () => {
    const accounts = await prisma.user.count({
      where: {
        orders: {
          none: {
            status: "DELIVERED",
          },
        },
        emailVerified: true,
        role: "USER"
      },
    });
    return accounts;
  },
  ["accountsWithoutPurchases"],
  {
    revalidate: 3600,
    tags: ["accountsWithoutPurchases"],
  },
);
