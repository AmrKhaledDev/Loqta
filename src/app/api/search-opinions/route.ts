import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// ===========================================
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("q")?.trim();
    if (!search)
      return NextResponse.json(
        { error: "برجاء الكتابة للبحث عن تقييمات العملاء" },
        { status: 400 },
      );
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
      where: {
        OR: [
          {
            user: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            product: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(opinions, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء البحث عن تقييمات" },
      { status: 500 },
    );
  }
}
