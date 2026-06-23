import { prisma } from "@/lib/prisma";
import { Cache } from "../../Cache/Cache";
// ====================================
export const getNewCustomers = Cache(
  async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newCustomers = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
        emailVerified: true,
        role:"USER",
        orders: {
          some: {},
        },
      },
    });
    return newCustomers;
  },
  ["newCustomers"],
  {
    revalidate: 3600,
    tags: ["newCustomers"],
  },
);
