import SectionHead from "@/components/SectionHead/SectionHead";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { GetUserSessionWithRelations } from "@/lib/Sessions/GetUserSessionWithRelations";
import { redirect } from "next/navigation";
import OrderForm from "./_components/OrderForm";
import Orders from "./_components/Orders";
import { Metadata } from "next";
import OrderSummary from "./_components/OrderSummary";
// =============================================================
export const metadata: Metadata = {
  title: "إتمام الطلب",
  description:
    "أدخل بياناتك لإنشاء طلب جديد في متجر لُقطة وإتمام عملية الشراء بسهولة.",
};
async function Order() {
  const userSession = await GetUserSessionWithRelations();
  if (!userSession) return redirect("/login");

  return (
    <main className="section-p text-white">
      <div className="mycontainer section-flex">
        <SectionHead title="إتمام الطلب" />
        {userSession.userProducts.length > 0 ? (
          <Link
            href={"/cart"}
            className="ring ring-gray-50/20 flex items-center gap-3 py-3 px-10 hover:bg-white/15 mytransition hover:ring-gray-50/35 rounded-md w-fit font-semibold bg-white/5"
          >
            تعديل المنتجات <ShoppingBag />
          </Link>
        ) : (
          <Link
            href={"/categories"}
            className="ring ring-gray-50/20 flex items-center gap-3 py-3 px-10 hover:bg-white/15 mytransition hover:ring-gray-50/35 rounded-md w-fit font-semibold bg-white/5"
          >
            إضافة منتجات <ShoppingBag />
          </Link>
        )}
        <div className="flex gap-10">
          <div className="w-150 flex flex-col gap-5">
            <Orders userSession={userSession} />
            {userSession.userProducts.length > 0 && (
              <OrderSummary userSession={userSession} />
            )}
          </div>
          <OrderForm userSession={userSession} />
        </div>
      </div>
    </main>
  );
}

export default Order;
