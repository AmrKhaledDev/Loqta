import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// ==========================================
export async function GET(req: NextRequest) {
  const searchTxt = req.nextUrl.searchParams.get("q")?.trim();
  try {
    if (!searchTxt) {
      const products = await prisma.product.findMany({
        take: 9,
        include: {
          productImages: true,
          category: true,
        },
      });
      return NextResponse.json(products, { status: 200 });
    }
    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: searchTxt,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: searchTxt,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTxt,
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          isOnSale: true,
          discountPrice: true,
          productImages: true,
          category: true,
          stock: true,
        },
        orderBy: {
          createdAt: "desc",
        },

        take: 6,
      }),
      prisma.category.findMany({
        where: {
          name: {
            contains: searchTxt,
            mode: "insensitive",
          },
          products: {
            some: {},
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: { name: true, id: true },
        take: 5,
      }),
    ]);
    return NextResponse.json({ products, categories }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب بيانات البحث" },
      { status: 500 },
    );
  }
}
