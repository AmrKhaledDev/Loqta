import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ======================================
export const getActiveCustomers = Cache(
  async () => {
    const customers = await prisma.user.count({
      where: {
        emailVerified: true,
        orders: {
          some: {
            status: "DELIVERED",
          },
        },
        role: {
          in: ["USER", "SELLER"],
        },
      },
    });
    return customers;
  },
  ["activeCustomers"],
  {
    revalidate: 3600,
    tags: ["activeCustomers"],
  },
);
