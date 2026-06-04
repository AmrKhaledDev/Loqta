import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// ==========================================
export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("q")?.trim();
    if (!search)
      return NextResponse.json(
        { error: "برجاء الكتابة للبحث" },
        { status: 400 },
      );
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            name: {
              startsWith: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        role: "ADMIN",
      },
      take: 9,
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء البحث عن مسؤولين" },
      { status: 500 },
    );
  }
}
