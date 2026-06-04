import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ================================================
export const getOpinions = Cache(
  async () => {
    const opinions = await prisma.opinion.findMany({
      take: 9,
      include: {
        product: {
          include: {
            productImages: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return opinions;
  },
  ["opinions"],
  {
    revalidate: 3600,
    tags: ["opinions"],
  },
);
