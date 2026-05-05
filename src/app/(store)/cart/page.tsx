import SectionHead from "@/components/SectionHead/SectionHead";
import { GetUserSessionWithRelations } from "@/lib/Sessions/GetUserSessionWithRelations";
import TotalPrice from "./_components/TotalPrice";
import { redirect } from "next/navigation";
import Products from "./_components/Products";
import Link from "next/link";
import { Metadata } from "next";
// ====================================================
export const metadata: Metadata = {
  title: "سلة التسوق",
  description: "استعرض المنتجات التي أضفتها إلى سلة التسوق في متجر لُقطة وقم بمراجعتها قبل إتمام الطلب.",
};
async function Cart() {
  const userSession = await GetUserSessionWithRelations();
  if (!userSession) return redirect("/login");
  const totalPrice = userSession.userProducts.reduce(
    (acc, p) => acc + p.priceAtAdd * p.quantity,
    0,
  );
  return (
    <main className="section-p text-white">
      <div className="mycontainer section-flex">
        <SectionHead title="سلة التسوق الخاص بك" />
        {userSession.userProducts.length < 1 ? (
          <p className="text-center text-gray-400">
            لا يوجد منتجات في السلة
            <Link
              href={"/categories"}
              className="mr-1 font-semibold text-blue-400 underline hover:no-underline"
            >
              تسوق الآن
            </Link>
          </p>
        ) : (
          <>
            <Products products={userSession.userProducts} />
            <TotalPrice totalPrice={Number(totalPrice)} />
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;
