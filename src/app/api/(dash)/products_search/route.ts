import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// ================================================
export async function GET(req: NextRequest) {
  try {
    const searchTxt = req.nextUrl.searchParams.get("q")?.trim();
    if (!searchTxt)
      return NextResponse.json(
        { error: "أكتب إسم المنتج أو الوصف الخاص به للبحث عنه" },
        { status: 400 },
      );
    const products = await prisma.product.findMany({
      where: {
        OR: [
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
        isDeleted: false,
      },
      include: {
        productImages: true,
        category: true,
        opinions: true,
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء البحث " },
      { status: 500 },
    );
  }
}
