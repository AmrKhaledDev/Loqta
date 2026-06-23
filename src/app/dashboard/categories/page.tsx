import { Metadata } from "next";
import CategoryPageContent from "./_components/CategoryPageContent";
import { getCategoriesDash } from "@/lib/Db/PublicCaches/getCategoriesDash";
// ================================================
export const metadata: Metadata = {
  title: "لُقطة | الأصناف",
  description:
    "إضافة وتعديل الفئات، وترتيبها لتسهيل عملية تصفح المتجر والوصول السريع للمنتجات.",
};
async function Categories() {
  const categories = await getCategoriesDash();
  return (
    <main className="dashSectionStyle">
      <CategoryPageContent cates={categories} />
    </main>
  );
}

export default Categories;
