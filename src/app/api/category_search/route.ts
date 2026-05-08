import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// =======================================================
export async function GET(req: NextRequest) {
  try {
    const searchText = req.nextUrl.searchParams.get("q")?.trim();
    if (!searchText)
      return NextResponse.json({ error: "أكتب للبحث عن صنف" }, { status: 400 });
    const data = await prisma.category.findMany({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 10,
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء البحث عن صنف معين" },
      { status: 500 },
    );
  }
}
