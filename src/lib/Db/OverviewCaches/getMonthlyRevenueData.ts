import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ==========================================
export const getMonthlyRevenueData = Cache(
  async () => {
    const currentYear = new Date().getFullYear(); // 2026
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    const revenueData = await Promise.all(
      months.map(async (month, index) => {
        const startDate = new Date(currentYear, index, 1);
        const endDate = new Date(currentYear, index + 1, 0, 23, 59, 59);
        const orderSummary = await prisma.order.aggregate({
          _sum: {
            totalPrice: true,
          },
          where: {
            status: "DELIVERED",
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        });
        return { month, revenue: orderSummary._sum.totalPrice || 0 };
      }),
    );
    return revenueData;
  },
  ["monthlyRevenueData"],
  { revalidate: 3600, tags: ["monthlyRevenueData"] },
);
