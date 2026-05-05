import SectionHead from "@/components/SectionHead/SectionHead";
import { GetUserSession } from "@/lib/Sessions/GetUserSession";
import { Metadata } from "next";
import ProductsOffers from "./_components/ProductsOffers";
import { getCategoriesOffers } from "@/lib/Db/getCategoriesWithProductsOffers";
import { CategoriesOffers } from "@/lib/types";
// =================================================================
export const metadata: Metadata = {
  title: "الخصومات",
  description:
    "اكتشف أحدث الخصومات والعروض في متجر لُقطة ووفّر على مشترياتك من مختلف المنتجات بأسعار مميزة لفترة محدودة.",
};
async function Offers() {
  const categoriesOffers = await getCategoriesOffers();
  const userSession = await GetUserSession();
  return (
    <main className="section-p text-white">
      <div className="mycontainer section-flex sm:space-y-20 space-y-15">
        <SectionHead
          title="الخصومات"
          subtitle="فرصتك الذهبية للتوفير أوشكت على الانتهاء، استمتع بخصوماتنا الحصرية الآن قبل أن تعود الأسعار لوضعها الطبيعي."
        />
        <div className="flex flex-col gap-6">
          {categoriesOffers.map((cat: CategoriesOffers) => (
            <div key={cat.id} className="flex flex-col gap-1 group">
              <h2 className="font-black sm:text-2xl text-xl w-fit ">
                {cat.name}
                <span className="h-1 w-0 group-hover:w-full rounded-full bgg-ip block mt-2.5 mytransition" />
              </h2>
              <ProductsOffers
                userSession={userSession}
                products={cat.products}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Offers;
