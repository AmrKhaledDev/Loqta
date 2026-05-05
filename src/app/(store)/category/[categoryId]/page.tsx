import Products from "@/components/Products/Products";
import SectionHead from "@/components/SectionHead/SectionHead";
import { prisma } from "@/lib/prisma";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { redirect } from "next/navigation";
// ====================================
async function Category({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  if (!categoryId) return redirect("/");
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      products: {
        include: {
          productImages: true,
          category: true,
        },
      },
    },
  });
  if (!category) return redirect("/");
  const userSession = await GetUserSession();
  return (
    <main>
      <div className="mycontainer section-p section-flex text-white">
        <SectionHead title={`${category.name}`} />
        <Products products={category.products} userSession={userSession} />
      </div>
    </main>
  );
}

export default Category;
