import { Category } from "@prisma/client";
import { Cache } from "../../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ===============================================
export const getCategoriesDash = Cache(
  async (): Promise<Category[]> => {
    const data = await prisma.category.findMany({
      include: {
        products: {
          where: {
            isDeleted: false,
          },
        },
      },
    });
    return data;
  },
  ["categoriesDash"],
  { revalidate: 3600, tags: ["categoriesDash"] },
);
