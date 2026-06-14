"use client";
import { formatCurrency } from "@/lib/formates/formatCurrency";
import { formatCustomersCount } from "@/lib/formates/formatCustomersCount";
import { formateOrdersCount } from "@/lib/formates/formatOrdersCount";
import { formatProductsCount } from "@/lib/formates/formatProductsCount";
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
      textColor: "text-emerald-400",
    },
    {
      id: "ordersCount",
      content: formateOrdersCount(ordersCount),
      title: "عدد الطلبات",
      icon: ShoppingBag,
      textColor: "text-blue-400",
    },
    {
      id: "newCustomers",
      content: formatCustomersCount(newCustomers),
      title: "العملاء الجدد",
      icon: Users,
      textColor: "text-purple-400",
    },
    {
      id: "activeProducts",
      content: formatProductsCount(activeProducts),
      title: "المنتجات النشطة",
      icon: Package,
      textColor: "text-orange-400",
    },
  ];
  return (
    <main>
      <ul className="grid grid-cols-4 gap-5">
        {KPI_CARDS.map((card) => (
          <li
            key={card.id}
            className="kpiCardDesign"
          >
            <card.icon
              className={`${card.textColor} kpiCardIconDesign`}
            />
            <h2 className="text-2xl ">{card.title}</h2>
            <p className={`font-extrabold ${card.textColor}`}>( {card.content} )</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Overview;
