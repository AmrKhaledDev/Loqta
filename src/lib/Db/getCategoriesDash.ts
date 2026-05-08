import { Category } from "@prisma/client";
import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ===============================================
export const getCategoriesDash = Cache(
  async (): Promise<Category[]> => {
    const data = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return data;
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] },
);
