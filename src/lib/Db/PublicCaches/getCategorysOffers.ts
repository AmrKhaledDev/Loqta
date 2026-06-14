import { Cache } from "../../Cache/Cache";
import { CategoriesOffers } from "../../types/types";
import { prisma } from "@/lib/prisma";
// ===============================================
export const getCategorysOffers = Cache(
  async (): Promise<CategoriesOffers[]> => {
    const data = await prisma.category.findMany({
      where: {
        products: {
          some: {
            isOnSale: true,
            discountPrice: {
              not: null,
            },
          },
        },
      },
      include: {
        products: {
          include: {
            productImages: true,
            category: true,
            opinions: true,
          },
        },
      },
    });
    return data;
  },
  ["getCategorysOffers"],
  { revalidate: 3600, tags: ["getCategorysOffers"] },
);
