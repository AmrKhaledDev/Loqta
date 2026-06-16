import { Cache } from "../../Cache/Cache";
import { prisma } from "@/lib/prisma";
import { ProductDbType } from "../../types/types";
// ===============================================
export const getProducts = Cache(
  async (): Promise<ProductDbType[]> => {
    const data = await prisma.product.findMany({
      include: {
        productImages: true,
        category: true,
        opinions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isDeleted: false,
      },
    });
    return data;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);
