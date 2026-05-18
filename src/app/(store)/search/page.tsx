import SectionHead from "@/components/SectionHead/SectionHead";
import { prisma } from "@/lib/prisma";
import { ProductDbType } from "@/lib/types/types";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import Products from "@/components/Products/Products";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
// ==============================================
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
      },
      take: 9,
      include: {
        productImages: true,
        category: true,
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
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col gap-3 items-center">
              <h2 className="text-4xl font-bold">لم يتم العثور على نتائج</h2>
              <p className="text-gray-300 font-normal text-[17px]">
                لم نجد ما يطابق بحثك، جرب كلمات أخرى
              </p>
              <Link
                className="bg-indigo-500 text-sm mt-3 hover:scale-105 mytransition shadow py-2 px-6 rounded-full w-fit"
                href={"/categories"}
              >
                الذهاب لصفحة المنتجات
              </Link>
            </div>
            <Image
              src={"/not-found.jpg"}
              alt="not found"
              width={400}
              height={400}
              className="rounded-full animate-pulse p-3 bg-white size-90 object-cover shadow-2xl"
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default Search;
