import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import OrderStatus from "./_components/OrderStatus";
import OrderDetails from "./_components/OrderDetails";
// =====================================================
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
    <main className="flex flex-col gap-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl flex items-center gap-2">
          طلب رقم:
          <span className="font-extrabold">{currentOrder.order_num}#</span>
        </h1>
        <OrderStatus currentOrder={currentOrder} />
      </div>
      <div className="flex flex-col gap-10 p-4 ring ring-gray-50/10 bg-white/5 rounded-2xl">
        <h2 className="text-3xl font-semibold font-mono text-center">
          تفاصيل عن الطلب
        </h2>
        <OrderDetails currentOrder={currentOrder} />
      </div>
    </main>
  );
}

export default SingleOrder;
