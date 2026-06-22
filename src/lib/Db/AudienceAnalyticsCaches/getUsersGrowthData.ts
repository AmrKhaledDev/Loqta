import { Cache } from "@/lib/Cache/Cache";
import { months } from "@/lib/data/months";
import { prisma } from "@/lib/prisma";
export const getUsersCrowthData = Cache(
  async () => {
    const currentYear = new Date().getFullYear();
    const result = await Promise.all(
      months.map(async (month, index) => {
        const startDate = new Date(currentYear, index, 1);
        const endDate = new Date(currentYear, index + 1, 0, 23, 59, 59);
        const usersCount = await prisma.user.count({
          where: {
            createdAt: {
              lte: endDate,
              gte: startDate,
            },
            emailVerified: true,
            role: {
              in: ["SELLER", "USER"],
            },
          },
        });
        return { month, value: usersCount };
      }),
    );
    return result;
  },
  ["usersCrowthData"],
  {
    revalidate: 3600,
    tags: ["usersCrowthData"],
  },
);
