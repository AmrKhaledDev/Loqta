import { getProducts } from "@/lib/Db/PublicCaches/getProducts";
import ProductsPageContent from "./_components/ProductsPageContent";
import { getCategoriesDash } from "@/lib/Db/PublicCaches/getCategoriesDash";
// ==============================================================
async function Products() {
  const products = await getProducts();
  const categories = await getCategoriesDash()
  return (
    <main className="dashSectionStyle">
      <ProductsPageContent products={products} categories={categories}/>
    </main>
  );
}

export default Products;
