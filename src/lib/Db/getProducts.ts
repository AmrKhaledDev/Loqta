import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
import { ProductDbType } from "../types";
// ===============================================
export const getProducts = Cache(
  async (): Promise<ProductDbType[]> => {
    const data = await prisma.product.findMany({
      include: {
        productImages: true,
        category: true,
        opinions: true,
      },
      orderBy:{
        createdAt:"desc"
      }
    });
    return data;
  },
  ["products"],
  { revalidate: 3600, tags: ["products"] },
);
