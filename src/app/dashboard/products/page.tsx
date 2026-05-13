import { getProducts } from "@/lib/Db/getProducts";
import ProductsPageContent from "./_components/ProductsPageContent";
import { getCategoriesDash } from "@/lib/Db/getCategoriesDash";
// ==============================================================
async function Products() {
  const products = await getProducts();
  const categories = await getCategoriesDash()
  return (
    <main className="flex flex-col gap-10">
      <ProductsPageContent products={products} categories={categories}/>
    </main>
  );
}

export default Products;
