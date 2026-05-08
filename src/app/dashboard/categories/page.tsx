import CategoryPageContent from "./_components/CategoryPageContent";
import { getCategoriesDash } from "@/lib/Db/getCategoriesDash";
// ================================================
async function Categories() {
  const categories = await getCategoriesDash();
  return (
    <main className="flex flex-col gap-10">
      <CategoryPageContent cates={categories}/>
    </main>
  );
}

export default Categories;
