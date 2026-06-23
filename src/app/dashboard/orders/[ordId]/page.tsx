import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import OrderStatus from "./_components/OrderStatus";
import OrderDetails from "./_components/OrderDetails";
import { Metadata } from "next";
import { ORDER_STATUS_MAP } from "@/lib/data/OrderStatusMap";
// =====================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ordId: string }>;
}): Promise<Metadata> {
  const { ordId } = await params;
  if (!ordId) return { title: "هذا الطلب غير موجود" };
  const orderDB = await prisma.order.findUnique({
    where: {
      id: ordId,
    },
  });
  if (!orderDB) return { title: "هذا الطلب غير موجود" };
  return {
    title: `طلب رقم: #${orderDB.order_num}`,
    description: `طلب رقم: #${orderDB.order_num}, حالة الطلب: ${ORDER_STATUS_MAP[orderDB.status].label}`,
  };
}
async function SingleOrder({ params }: { params: Promise<{ ordId: string }> }) {
  const { ordId } = await params;
  if (!ordId) return redirect("/dashboard/orders");
  const currentOrder = await prisma.order.findUnique({
    where: {
      id: ordId,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              productImages: true,
            },
          },
        },
      },
    },
  });
  if (!currentOrder) return redirect("/dashboard/orders");
  return (
    <main className="flex flex-col gap-20 sm:h-[89vh] h-[90%] justify-between">
      <div className="flex items-center justify-between">
        <h1 className="md:text-3xl sm:text-2xl text-xl flex items-center gap-2">
          طلب رقم:
          <span className="font-extrabold">{currentOrder.order_num}#</span>
        </h1>
        <OrderStatus currentOrder={currentOrder} />
      </div>
      <div className="flex flex-col gap-10 mb-5 sm:p-7 p-4 ring ring-gray-50/10 bg-white/5 rounded-2xl">
        <h2 className="md:text-3xl sm:text-2xl text-xl font-semibold font-mono text-center">
          تفاصيل عن الطلب
        </h2>
        <OrderDetails currentOrder={currentOrder} />
      </div>
    </main>
  );
}

export default SingleOrder;
