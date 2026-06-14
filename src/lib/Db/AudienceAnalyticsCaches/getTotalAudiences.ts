import { Cache } from "@/lib/Cache/Cache";
import { prisma } from "@/lib/prisma";
// ======================================
export const getTotalAudiences = Cache(
  async () => {
    const audiences = await prisma.user.count({
      where: {
        emailVerified: true,
        role: {
          in: ["USER", "SELLER"],
        },
      },
    });
    return audiences;
  },
  ["totalAudiences"],
  {
    revalidate: 3600,
    tags: ["totalAudiences"],
  },
);
