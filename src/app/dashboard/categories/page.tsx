import { Metadata } from "next";
import CategoryPageContent from "./_components/CategoryPageContent";
import { getCategoriesDash } from "@/lib/Db/getCategoriesDash";
// ================================================
export const metadata: Metadata = {
  title: "لُقطة | لوحة التحكم | الأصناف",
};
async function Categories() {
  const categories = await getCategoriesDash();
  return (
    <main className="flex flex-col gap-10">
      <CategoryPageContent cates={categories} />
    </main>
  );
}

export default Categories;
