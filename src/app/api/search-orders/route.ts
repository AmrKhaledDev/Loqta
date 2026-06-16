import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// =====================================================
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("q");
    if (!search)
      return NextResponse.json(
        { error: "برجاء كتابة رقم الطلب للبحث" },
        { status: 400 },
      );
    const orders = await prisma.order.findMany({
      where: {
        order_num: Number(search),
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                productImages: true,
              },
            },
          },
        },
      },
    });
    if (orders.length > 0) {
      return NextResponse.json(orders, { status: 200 });
    } else {
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء البحث عن الطلب حاول مرة أخرى" },
      { status: 500 },
    );
  }
}
