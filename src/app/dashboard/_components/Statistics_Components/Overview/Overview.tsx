"use client";
import { formatActiveProductsCount } from "@/lib/formates/formatActiveProductsCount";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { formatCustomersCount } from "@/lib/formates/formatCustomersCount";
import { formateOrdersCount } from "@/lib/formates/formatOrdersCount";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
// ========================================================================
function Overview({
  totalSales,
  ordersCount,
  newCustomers,
  activeProducts,
}: {
  totalSales: number;
  ordersCount: number;
  newCustomers: number;
  activeProducts: number;
}) {
  const KPI_CARDS = [
    {
      id: "totalSales",
      content: formatCurrency.format(totalSales),
      title: "إجمالي المبيعات",
      icon: DollarSign,
      bgColor: "text-emerald-400",
    },
    {
      id: "ordersCount",
      content: formateOrdersCount(ordersCount),
      title: "عدد الطلبات",
      icon: ShoppingBag,
      bgColor: "text-blue-400",
    },
    {
      id: "newCustomers",
      content: formatCustomersCount(newCustomers),
      title: "العملاء الجدد",
      icon: Users,
      bgColor: "text-purple-400",
    },
    {
      id: "activeProducts",
      content: formatActiveProductsCount(activeProducts),
      title: "المنتجات النشطة",
      icon: Package,
      bgColor: "text-orange-400",
    },
  ];
  return (
    <div>
      <ul className="grid grid-cols-4 gap-5">
        {KPI_CARDS.map((card) => (
          <li
            key={card.id}
            className="p-5 ring ring-gray-50/10 bg-black/5 shadow-2xl rounded-2xl flex flex-col items-center gap-5"
          >
            <card.icon
              className={`${card.bgColor} bg-black/30 size-12 p-2 rounded-2xl ring ring-gray-50/10 shadow-2xl`}
            />
            <h2 className="text-2xl ">{card.title}</h2>
            <p className={`font-extrabold ${card.bgColor}`}>( {card.content} )</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Overview;
