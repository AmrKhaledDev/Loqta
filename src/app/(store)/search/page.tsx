import SectionHead from "@/components/SectionHead/SectionHead";
import { prisma } from "@/lib/prisma";
import { ProductDbType } from "@/lib/types/types";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import Products from "@/components/Products/Products";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";
// ==========================================================
export const metadata: Metadata = {
  title: "لُقطة | نتائج البحث",
  description:
    "استعراض وتصفية نتائج البحث؛ عرض كافة المنتجات المطابقة لعلامات البحث الخاصة بك، مع توفير خيارات بديلة وتوصيات مخصصة في حال عدم توفر نتائج دقيقة.",
};
async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const search = params.q;
  if (search == undefined) return redirect("/");
  let SuggestedProducts: ProductDbType[] | null = null;
  if (search) {
    SuggestedProducts = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: search,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
        isDeleted: false,
      },
      take: 9,
      include: {
        productImages: true,
        category: true,
        opinions: true,
      },
    });
  }
  const userSession = await GetUserSession();
  const title =
    search.trim().length > 10
      ? search.slice(0, 10) + "..."
      : search.slice(0, 10);
  return (
    <main>
      <div className="mycontainer section-p text-white section-flex">
        {SuggestedProducts !== null && SuggestedProducts.length > 0 ? (
          <>
            <SectionHead title={`منتجات مقترحة عن "${title}"`} />
            <Products products={SuggestedProducts} userSession={userSession} />
          </>
        ) : (
          <div className="flex flex-col gap-10 items-center h-[80vh] justify-center">
            <div className="flex flex-col gap-5 items-center">
              <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold">
                لم يتم العثور على نتائج
              </h2>
              <p className="text-gray-300 font-normal sm:text-[17px] text-sm">
                لم نجد ما يطابق بحثك، جرب كلمات أخرى
              </p>
              <Link
                className="ring ring-gray-50/20 bg-white/10 sm:text-sm text-xs hover:scale-102 mytransition shadow py-2 px-6 rounded-full w-fit"
                href={"/categories"}
              >
                الذهاب لصفحة المنتجات
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Search;
