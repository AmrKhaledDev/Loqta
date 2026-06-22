import { Category } from "@prisma/client";
import { Cache } from "../../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ===============================================
export const getCategories = Cache(
  async (): Promise<Category[]> => {
    const data = await prisma.category.findMany({
      where: {
        products: {
          some: { isDeleted: false },
        },
      },
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
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);
