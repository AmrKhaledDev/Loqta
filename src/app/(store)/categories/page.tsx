import SectionHead from "@/components/SectionHead/SectionHead";
import ProductsWithFilter from "./_components/ProductsWithFilter";
import { getCategories } from "@/lib/Db/getCategories";
import { getProducts } from "@/lib/Db/getProducts";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { Metadata } from "next";
// ====================================================
export const metadata: Metadata = {
  title: "الفئات",
  description:
    "تصفح فئات متجر لُقطة المختلفة واستعرض المنتجات بسهولة حسب التصنيف الذي يناسب احتياجك.",
};
async function Categories() {
  const categories = await getCategories();
  const products = await getProducts();
  const userSession = await GetUserSession();
  return (
    <main className="section-p">
      <div className="mycontainer text-white section-flex">
        <SectionHead title="تسوق حسب الفئة" />
        <ProductsWithFilter
          categories={categories}
          products={products}
          userSession={userSession}
        />
      </div>
    </main>
  );
}

export default Categories;
